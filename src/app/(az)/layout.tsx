import type { Metadata, Viewport } from 'next';
import { RootShell, siteMetadata, siteViewport } from '@/components/RootShell';

export const metadata: Metadata = siteMetadata('az');
export const viewport: Viewport = siteViewport;

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="az">{children}</RootShell>;
}
