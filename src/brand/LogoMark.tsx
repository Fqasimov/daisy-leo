import type { CSSProperties } from 'react';
import { LOGO } from './logo-paths';
import { FLOWER_TONE, MANE_TONES } from './palette';

type Props = {
  /** 'color' = the brand's gold-to-garnet; otherwise a single flat ink. */
  tone?: 'color' | string;
  className?: string;
  style?: CSSProperties;
  title?: string;
};

export function LogoMark({ tone = 'color', className, style, title }: Props) {
  const color = tone === 'color';
  return (
    <svg
      viewBox={LOGO.viewBox}
      className={className}
      style={style}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {LOGO.mane.map((d, i) => (
        <path key={i} d={d} fill={color ? MANE_TONES[i] : tone} />
      ))}
      <path d={LOGO.flower} fill={color ? FLOWER_TONE : tone} />
    </svg>
  );
}
