'use client';

import { Player, type PlayerRef } from '@remotion/player';
import { useCallback, useEffect, useRef, useState } from 'react';
import { INTRO_FRAMES, LogoIntro } from '@/remotion/LogoIntro';

export const INTRO_DONE = 'dl:intro-done';

const BASE = 1080;

/**
 * The closed lid. Plays the Remotion logo composition, then lifts away like the
 * lid of the gift box (hinged at the top edge) to reveal the site underneath.
 */
export function Intro({ skipLabel }: { skipLabel: string }) {
  const [active, setActive] = useState(false);
  const [size, setSize] = useState<{ w: number; h: number } | null>(null);
  const shell = useRef<HTMLDivElement>(null);
  const player = useRef<PlayerRef>(null);
  const lifted = useRef(false);

  const lift = useCallback(() => {
    if (lifted.current) return;
    lifted.current = true;
    try {
      sessionStorage.setItem('dl-intro', '1');
    } catch {}
    document.documentElement.classList.remove('intro-playing');
    window.dispatchEvent(new Event(INTRO_DONE));
    const el = shell.current;
    if (!el) return;
    const anim = el.animate(
      [
        { transform: 'perspective(1800px) rotateX(0deg) translateY(0)', opacity: 1 },
        { transform: 'perspective(1800px) rotateX(-58deg) translateY(-34%)', opacity: 1, offset: 0.7 },
        { transform: 'perspective(1800px) rotateX(-74deg) translateY(-62%)', opacity: 0 },
      ],
      { duration: 1150, easing: 'cubic-bezier(0.77, 0, 0.175, 1)', fill: 'forwards' },
    );
    anim.onfinish = () => {
      document.documentElement.classList.add('intro-done');
      setActive(false);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (root.classList.contains('intro-done')) {
      window.dispatchEvent(new Event(INTRO_DONE));
      return;
    }
    const w = window.innerWidth;
    const h = window.innerHeight;
    // Match the composition to the screen so nothing letterboxes.
    setSize(w >= h ? { w: Math.round((BASE * w) / h), h: BASE } : { w: BASE, h: Math.round((BASE * h) / w) });
    setActive(true);
    root.classList.add('intro-playing');
    const failsafe = window.setTimeout(lift, 9000);
    return () => window.clearTimeout(failsafe);
  }, [lift]);

  useEffect(() => {
    const p = player.current;
    if (!active || !p) return;
    p.addEventListener('ended', lift);
    return () => p.removeEventListener('ended', lift);
  }, [active, size, lift]);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && lift();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, lift]);

  return (
    <div ref={shell} className="intro" aria-hidden={!active}>
      {active && size ? (
        <Player
          ref={player}
          component={LogoIntro}
          durationInFrames={INTRO_FRAMES}
          fps={30}
          compositionWidth={size.w}
          compositionHeight={size.h}
          autoPlay
          controls={false}
          loop={false}
          clickToPlay={false}
          doubleClickToFullscreen={false}
          spaceKeyToPlayOrPause={false}
          numberOfSharedAudioTags={0}
          initiallyMuted
          style={{ width: '100%', height: '100%' }}
        />
      ) : null}
      {active ? (
        <button type="button" className="intro__skip" onClick={lift}>
          {skipLabel}
        </button>
      ) : null}
    </div>
  );
}
