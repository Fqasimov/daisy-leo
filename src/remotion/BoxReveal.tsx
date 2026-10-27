import { useEffect, useMemo, useState } from 'react';
import { ThreeCanvas } from '@remotion/three';
import { useThree } from '@react-three/fiber';
import { continueRender, delayRender, Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { C } from '../brand/palette';
import { ensureFonts, lidCanvas, ribbonCanvas, woodCanvas } from './textures';

export type BoxRevealProps = { faceUrl: string };

export const BOX_FRAMES = 120;

// Box geometry (scene units).
const W = 3.4; // outer width and depth
const H = 0.72; // base height
const T = 0.08; // wall thickness
const LID_T = 0.13;
const R = 1.27; // clock radius
const FACE_SPIN = 1.65; // turns the photo so XII sits at the top

const ease = Easing.bezier(0.77, 0, 0.175, 1);
const out = Easing.bezier(0.23, 1, 0.32, 1);
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

type Mats = {
  wood: THREE.Material;
  woodEnd: THREE.Material;
  lidTop: THREE.Material;
  ribbon: THREE.MeshStandardMaterial;
  face: THREE.Material;
};

function useMaterials(faceUrl: string): Mats | null {
  const [mats, setMats] = useState<Mats | null>(null);
  const [handle] = useState(() => delayRender('Box textures'));
  useEffect(() => {
    let alive = true;
    (async () => {
      await ensureFonts();
      const tex = (c: HTMLCanvasElement) => {
        const t = new THREE.CanvasTexture(c);
        t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = 8;
        return t;
      };
      const face = await new THREE.TextureLoader().loadAsync(faceUrl);
      face.colorSpace = THREE.SRGBColorSpace;
      face.anisotropy = 8;
      // Spin the photo on the cylinder cap so XII sits at the top.
      face.center.set(0.5, 0.5);
      face.rotation = FACE_SPIN;
      const woodTex = tex(woodCanvas());
      const endTex = tex(woodCanvas(512, 512, 19));
      endTex.rotation = Math.PI / 2;
      if (!alive) return;
      setMats({
        wood: new THREE.MeshStandardMaterial({ map: woodTex, roughness: 0.62, metalness: 0 }),
        woodEnd: new THREE.MeshStandardMaterial({ map: endTex, roughness: 0.62 }),
        lidTop: new THREE.MeshStandardMaterial({ map: tex(lidCanvas()), roughness: 0.58 }),
        ribbon: new THREE.MeshStandardMaterial({ map: tex(ribbonCanvas()), roughness: 0.32, metalness: 0.15, transparent: true }),
        face: new THREE.MeshPhysicalMaterial({
          map: face,
          roughness: 0.28,
          clearcoat: 1,
          clearcoatRoughness: 0.06,
          envMapIntensity: 1.6,
        }),
      });
      continueRender(handle);
    })().catch((e) => {
      console.error(e);
      continueRender(handle);
    });
    return () => {
      alive = false;
    };
  }, [faceUrl, handle]);
  return mats;
}

function Stage({ target, distance, height }: { target: [number, number, number]; distance: number; height: number }) {
  const { camera, gl, scene } = useThree();
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = env;
    // Reflections for the resin's clearcoat; kept low so the walnut stays walnut.
    scene.environmentIntensity = 0.32;
    return () => {
      env.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  camera.position.set(target[0] * 0.35, height, distance);
  camera.lookAt(...target);
  return null;
}

/** In the Player, render only when the Remotion frame or size changes (never a 60fps idle loop). */
function Invalidate({ frame, width, height }: { frame: number; width: number; height: number }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    invalidate();
  }, [frame, width, height, invalidate]);
  return null;
}

function Base({ m }: { m: Mats }) {
  const inner = W - 2 * T;
  return (
    <group>
      <mesh position={[0, T / 2, 0]} receiveShadow castShadow material={m.wood}>
        <boxGeometry args={[W, T, W]} />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={`fz${s}`} position={[0, H / 2, s * (W / 2 - T / 2)]} castShadow receiveShadow material={m.wood}>
          <boxGeometry args={[W, H, T]} />
        </mesh>
      ))}
      {[-1, 1].map((s) => (
        <mesh key={`fx${s}`} position={[s * (W / 2 - T / 2), H / 2, 0]} castShadow receiveShadow material={m.woodEnd}>
          <boxGeometry args={[T, H, inner]} />
        </mesh>
      ))}
      {/* Emerald lining */}
      <mesh position={[0, T + 0.004, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[inner, inner]} />
        <meshStandardMaterial color={C.emerald} roughness={1} />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={`lz${s}`} position={[0, H / 2 + T / 2, s * (inner / 2 - 0.002)]} rotation={[0, s > 0 ? Math.PI : 0, 0]}>
          <planeGeometry args={[inner, H - T]} />
          <meshStandardMaterial color={C.emerald} roughness={1} />
        </mesh>
      ))}
      {[-1, 1].map((s) => (
        <mesh key={`lx${s}`} position={[s * (inner / 2 - 0.002), H / 2 + T / 2, 0]} rotation={[0, (-s * Math.PI) / 2, 0]}>
          <planeGeometry args={[inner, H - T]} />
          <meshStandardMaterial color={C.emerald} roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

function Ribbon({ m, slide }: { m: Mats; slide: number }) {
  m.ribbon.opacity = 1 - slide;
  const w = 0.36;
  const drop = 0.5;
  return (
    <group position={[slide * 3.2, 0, 0.62]}>
      <mesh position={[0, LID_T + 0.004, 0]} rotation={[-Math.PI / 2, 0, 0]} material={m.ribbon} castShadow>
        <planeGeometry args={[W + 0.1, w]} />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * (W / 2 + 0.054), LID_T - drop / 2, 0]} rotation={[0, (s * Math.PI) / 2, 0]} material={m.ribbon}>
          <planeGeometry args={[w, drop]} />
        </mesh>
      ))}
    </group>
  );
}

function Clock({ m, rise, turn }: { m: Mats; rise: number; turn: number }) {
  const side = useMemo(() => new THREE.MeshStandardMaterial({ color: '#ece4d4', roughness: 0.35 }), []);
  const back = useMemo(() => new THREE.MeshStandardMaterial({ color: '#d9cfbd', roughness: 0.8 }), []);
  return (
    <group
      position={[0, interpolate(rise, [0, 1], [T + 0.05, 1.5]), interpolate(rise, [0, 1], [0, -0.32])]}
      rotation={[interpolate(turn, [0, 1], [0, Math.PI / 2 - 0.24]), interpolate(turn, [0, 1], [0.5, 0]), 0]}
    >
      <mesh castShadow material={[side, m.face, back]}>
        <cylinderGeometry args={[R, R, 0.075, 128, 1, false]} />
      </mesh>
    </group>
  );
}

export const BoxReveal: React.FC<BoxRevealProps> = ({ faceUrl }) => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const m = useMaterials(faceUrl);
  const f = frame / (durationInFrames - 1);

  const aspect = width / height;
  const wide = aspect > 1.05;
  // Wide screens: box sits right of centre; portrait: centred and lower, smaller.
  const groupX = wide ? Math.min(2.9, 1.1 + (aspect - 1) * 2.4) : 0;
  const groupY = wide ? -0.35 : -1.85;
  const scale = wide ? 1 : Math.max(0.55, Math.min(0.85, aspect * 1.1));

  const slide = interpolate(f, [0.02, 0.16], [0, 1], { ...clamp, easing: ease });
  const lid = interpolate(f, [0.1, 0.55], [0, 1], { ...clamp, easing: ease });
  const rise = interpolate(f, [0.4, 0.9], [0, 1], { ...clamp, easing: out });
  const turn = interpolate(f, [0.48, 0.96], [0, 1], { ...clamp, easing: ease });
  const dolly = interpolate(f, [0, 1], [10.6, 9.6], clamp);

  return (
    <ThreeCanvas width={width} height={height} shadows="percentage" frameloop="demand" gl={{ alpha: true, antialias: true, preserveDrawingBuffer: true }} camera={{ fov: 30, near: 0.1, far: 100 }}>
      <Invalidate frame={frame} width={width} height={height} />
      <Stage target={[groupX * 0.5, 1.05 + groupY * 0.6, 0]} distance={dolly} height={4.4} />
      <ambientLight intensity={0.42} color="#fff6e8" />
      <directionalLight
        position={[-4, 9, 6]}
        intensity={1.9}
        color="#fff1dc"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-7}
        shadow-camera-right={7}
        shadow-camera-top={7}
        shadow-camera-bottom={-7}
        shadow-bias={-0.0004}
        shadow-radius={6}
      />
      <directionalLight position={[6, 3, -4]} intensity={0.5} color="#e8f0ec" />
      <group position={[groupX, groupY, 0]} scale={scale} rotation={[0, wide ? -0.32 : -0.22, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[40, 40]} />
          <shadowMaterial opacity={0.22} color="#3a2a1c" />
        </mesh>
        {m ? (
          <>
            <Base m={m} />
            <group position={[0, H, -W / 2]} rotation={[interpolate(lid, [0, 1], [0, -1.98]), 0, 0]}>
              <group position={[0, 0, W / 2]}>
                <mesh position={[0, LID_T / 2, 0]} castShadow receiveShadow material={[m.woodEnd, m.woodEnd, m.lidTop, m.wood, m.wood, m.wood]}>
                  <boxGeometry args={[W + 0.04, LID_T, W + 0.04]} />
                </mesh>
                {slide < 1 ? <Ribbon m={m} slide={slide} /> : null}
              </group>
            </group>
            <Clock m={m} rise={rise} turn={turn} />
          </>
        ) : null}
      </group>
    </ThreeCanvas>
  );
};
