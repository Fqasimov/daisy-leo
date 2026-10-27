import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PiecePage, pieceMetadata } from '@/components/PiecePage';
import { PIECES, pieceBySlug } from '@/data/pieces';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => PIECES.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const piece = pieceBySlug((await params).slug);
  return piece ? pieceMetadata(piece, 'en') : {};
}

export default async function Page({ params }: Props) {
  const piece = pieceBySlug((await params).slug);
  if (!piece) notFound();
  return <PiecePage piece={piece} locale="en" />;
}
