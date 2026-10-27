import { IMAGE_SIZE } from '@/data/images';
import { asset } from '@/lib/asset';

type Props = {
  name: string;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  focus?: string;
};

/** Studio photo with WebP srcset (640/1100) and a JPEG fallback. */
export function Picture({ name, alt, sizes, className, priority, focus }: Props) {
  const [width, height] = IMAGE_SIZE[name] ?? [];
  return (
    <picture className={className}>
      <source type="image/webp" srcSet={`${asset(`images/${name}-640.webp`)} 640w, ${asset(`images/${name}-1100.webp`)} 1100w`} sizes={sizes} />
      <img
        src={asset(`images/${name}.jpg`)}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : undefined}
        style={focus ? { objectPosition: focus } : undefined}
      />
    </picture>
  );
}
