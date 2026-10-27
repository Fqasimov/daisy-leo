'use client';

import { Player, type PlayerRef } from '@remotion/player';
import { useEffect, useRef, useState } from 'react';
import { BOX_FRAMES, BoxReveal } from '@/remotion/BoxReveal';
import { asset } from '@/lib/asset';
import { INTRO_DONE } from './Intro';

const LAST = BOX_FRAMES - 1;
/** Frames the box plays by itself once the intro lid has lifted: the ribbon slides off. */
const SELF_OPEN = 18;

/**
 * The 3D gift box (Remotion + three.js). Scrolling through the hero scrubs the
 * composition: the lid hinges open and the Sahil clock rises out of the box.
 */
export default function HeroBox({ onProgress }: { onProgress?: (p: number) => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  const player = useRef<PlayerRef>(null);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect;
      if (width > 0 && height > 0) setSize({ w: Math.round(width), h: Math.round(height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!size) return;
    const section = wrap.current?.closest('section');
    if (!section) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let auto = 0;
    let autoTarget = 0;
    let shown = -1;
    let current = 0;
    let raf = 0;

    const scrollTarget = () => {
      const r = section.getBoundingClientRect();
      const span = Math.max(1, r.height - window.innerHeight);
      const p = Math.min(1, Math.max(0, -r.top / span));
      onProgress?.(p);
      return SELF_OPEN + p * (LAST - SELF_OPEN);
    };

    const tick = () => {
      raf = 0;
      if (auto < autoTarget) auto = Math.min(autoTarget, auto + 0.6);
      const target = Math.max(auto, scrollTarget() * (autoTarget > 0 ? 1 : 0));
      current += (target - current) * 0.14;
      if (Math.abs(target - current) < 0.05) current = target;
      const f = Math.round(current);
      if (f !== shown) {
        shown = f;
        player.current?.seekTo(f);
      }
      if (current !== target || auto < autoTarget) raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    if (reduced) {
      player.current?.seekTo(LAST);
      onProgress?.(1);
      return;
    }

    const start = () => {
      autoTarget = SELF_OPEN;
      kick();
    };
    if (document.documentElement.classList.contains('intro-done')) start();
    window.addEventListener(INTRO_DONE, start);
    window.addEventListener('scroll', kick, { passive: true });
    window.addEventListener('resize', kick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener(INTRO_DONE, start);
      window.removeEventListener('scroll', kick);
      window.removeEventListener('resize', kick);
    };
  }, [size, onProgress]);

  return (
    <div ref={wrap} className="hero__stage" data-ready={ready || undefined}>
      {size ? (
        <Player
          ref={player}
          component={BoxReveal}
          inputProps={{ faceUrl: asset('images/tex-sahil-face.webp') }}
          durationInFrames={BOX_FRAMES}
          fps={30}
          compositionWidth={size.w}
          compositionHeight={size.h}
          controls={false}
          loop={false}
          clickToPlay={false}
          doubleClickToFullscreen={false}
          spaceKeyToPlayOrPause={false}
          moveToBeginningWhenEnded={false}
          style={{ width: '100%', height: '100%' }}
          numberOfSharedAudioTags={0}
          initiallyMuted
        />
      ) : null}
      <ReadySignal onReady={() => setReady(true)} />
    </div>
  );
}

/** Fades the stage in one frame after mount so the first WebGL frame isn't a flash. */
function ReadySignal({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    const t = window.setTimeout(onReady, 350);
    return () => window.clearTimeout(t);
  }, [onReady]);
  return null;
}
