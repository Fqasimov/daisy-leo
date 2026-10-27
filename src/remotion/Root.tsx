import '@fontsource/gloock/400.css';
import '@fontsource-variable/hanken-grotesk/wght.css';
import { useEffect, useState } from 'react';
import { AbsoluteFill, Composition, continueRender, delayRender, Img, staticFile } from 'remotion';
import { BOX_FRAMES, BoxReveal } from './BoxReveal';
import { INTRO_FRAMES, LogoIntro } from './LogoIntro';
import { woodCanvas } from './textures';

/** Still: the walnut grain, exported for the website's dividers and footer. */
const Walnut: React.FC = () => {
  const [src, setSrc] = useState<string | null>(null);
  const [handle] = useState(() => delayRender('Walnut'));
  useEffect(() => {
    setSrc(woodCanvas(1200, 1200, 23).toDataURL('image/png'));
    continueRender(handle);
  }, [handle]);
  return <AbsoluteFill>{src ? <Img src={src} /> : null}</AbsoluteFill>;
};

// Studio / render entry. The website plays the same compositions live in <Player>.
export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="LogoIntro" component={LogoIntro} durationInFrames={INTRO_FRAMES} fps={30} width={1920} height={1080} />
    <Composition id="LogoIntroVertical" component={LogoIntro} durationInFrames={INTRO_FRAMES} fps={30} width={1080} height={1920} />
    <Composition
      id="BoxReveal"
      component={BoxReveal}
      durationInFrames={BOX_FRAMES}
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{ faceUrl: staticFile('images/tex-sahil-face.webp') }}
    />
    <Composition
      id="BoxRevealVertical"
      component={BoxReveal}
      durationInFrames={BOX_FRAMES}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{ faceUrl: staticFile('images/tex-sahil-face.webp') }}
    />
    <Composition id="Walnut" component={Walnut} durationInFrames={1} fps={30} width={1200} height={1200} />
  </>
);
