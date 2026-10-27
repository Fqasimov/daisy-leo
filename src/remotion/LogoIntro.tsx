import { evolvePath } from '@remotion/paths';
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { LOGO } from '../brand/logo-paths';
import { C, FLOWER_TONE, MANE_TONES } from '../brand/palette';

export const INTRO_FRAMES = 138;

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const out = Easing.bezier(0.23, 1, 0.32, 1);
const inOut = Easing.bezier(0.77, 0, 0.175, 1);

const WORD = 'Daisy & Leo';

/**
 * The box, closed: the satin ribbon slides off, the lion's mane is drawn stroke
 * by stroke in gold, the daisy blooms at its heart, the name rises. The website
 * then lifts this frame away like a lid.
 */
export const LogoIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const [, , vw, vh] = LOGO.viewBox.split(' ').map(Number);

  const portrait = height > width;
  const markH = Math.min(height * (portrait ? 0.3 : 0.4), width * 0.62);
  const markW = (markH * vw) / vh;
  const wordSize = markH * (portrait ? 0.27 : 0.22);
  const blockH = markH + wordSize * 2.2;
  const top = (height - blockH) / 2;

  // Ribbon: lies across the closed lid, then is drawn off to the right.
  const ribbonOff = interpolate(frame, [6, 34], [0, 1], { ...clamp, easing: inOut });
  const ribbonH = Math.max(46, markH * 0.19);
  const diag = Math.hypot(width, height) * 1.3;

  // Gold glint sweeping across the finished mark.
  const glint = interpolate(frame, [104, 132], [-0.3, 1.3], clamp);

  return (
    <AbsoluteFill style={{ backgroundColor: C.obsidian, overflow: 'hidden' }}>
      <svg
        width={markW}
        height={markH}
        viewBox={LOGO.viewBox}
        style={{ position: 'absolute', left: (width - markW) / 2, top, overflow: 'visible' }}
      >
        <defs>
          <clipPath id="dl-mark">
            {LOGO.mane.map((d, i) => (
              <path key={i} d={d} />
            ))}
            <path d={LOGO.flower} />
          </clipPath>
        </defs>
        {LOGO.mane.map((d, i) => {
          const start = 16 + i * 5;
          const draw = interpolate(frame, [start, start + 24], [0, 1], { ...clamp, easing: out });
          const fill = interpolate(frame, [start + 12, start + 30], [0, 1], { ...clamp, easing: out });
          const { strokeDasharray, strokeDashoffset } = evolvePath(draw, d);
          return (
            <g key={i}>
              <path d={d} fill={MANE_TONES[i]} fillOpacity={fill} />
              <path
                d={d}
                fill="none"
                stroke={C.goldLight}
                strokeWidth={5}
                strokeLinejoin="round"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeOpacity={1 - fill * 0.9}
              />
            </g>
          );
        })}
        <g
          style={{
            transformBox: 'fill-box',
            transformOrigin: 'center',
            opacity: interpolate(frame, [58, 74], [0, 1], clamp),
            scale: interpolate(frame, [58, 88], [0.45, 1], { ...clamp, easing: out }),
            rotate: `${interpolate(frame, [58, 90], [-72, 0], { ...clamp, easing: out })}deg`,
          }}
        >
          <path d={LOGO.flower} fill={FLOWER_TONE} />
        </g>
        <rect
          clipPath="url(#dl-mark)"
          x={vw * glint - vw * 0.12}
          y={-vh * 0.2}
          width={vw * 0.12}
          height={vh * 1.4}
          fill="#fff8e6"
          opacity={0.32}
          transform={`rotate(18 ${vw / 2} ${vh / 2})`}
        />
      </svg>

      <div
        style={{
          position: 'absolute',
          top: top + markH + wordSize * 0.45,
          width: '100%',
          textAlign: 'center',
          fontFamily: 'Gloock, Georgia, serif',
          fontSize: wordSize,
          lineHeight: 1,
          color: C.goldLight,
          whiteSpace: 'pre',
        }}
      >
        {WORD.split('').map((ch, i) => {
          const s = 74 + i * 2.5;
          return (
            <span
              key={i}
              style={{
                display: 'inline-block',
                opacity: interpolate(frame, [s, s + 14], [0, 1], clamp),
                translate: `0 ${interpolate(frame, [s, s + 18], [0.35, 0], { ...clamp, easing: out })}em`,
                filter: `blur(${interpolate(frame, [s, s + 16], [6, 0], clamp)}px)`,
              }}
            >
              {ch}
            </span>
          );
        })}
        <div
          style={{
            marginTop: wordSize * 0.32,
            fontFamily: '"Hanken Grotesk Variable", system-ui, sans-serif',
            fontWeight: 500,
            fontSize: Math.max(12, wordSize * 0.24),
            letterSpacing: '0.62em',
            paddingLeft: '0.62em',
            color: C.gold,
            opacity: interpolate(frame, [98, 114], [0, 1], clamp),
          }}
        >
          DESIGN
        </div>
      </div>

      {/* The satin ribbon across the closed lid */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: diag,
          height: ribbonH,
          marginLeft: -diag / 2,
          marginTop: -ribbonH / 2,
          rotate: '-14deg',
          translate: `${ribbonOff * diag}px 0`,
          backgroundColor: C.satin,
          borderTop: '1px solid rgba(255,240,230,0.16)',
          borderBottom: '1px solid rgba(255,240,230,0.16)',
          boxShadow: '0 18px 40px rgba(0,0,0,0.55)',
          display: 'flex',
          alignItems: 'center',
          gap: ribbonH * 1.6,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          fontFamily: 'Gloock, Georgia, serif',
          fontSize: ribbonH * 0.46,
          color: C.goldLight,
          paddingLeft: ribbonH,
          opacity: interpolate(frame, [30, 36], [1, 0], clamp),
        }}
      >
        {Array.from({ length: 14 }, (_, i) => (
          <span key={i}>Daisy &amp; Leo Design</span>
        ))}
      </div>
    </AbsoluteFill>
  );
};
