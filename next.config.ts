import type { NextConfig } from 'next';

// PREVIEW=1 builds a copy whose pages load assets via relative "../" URLs, for the
// hosted preview; scripts/build-preview.mjs then flattens every page to one depth.
const preview = process.env.PREVIEW === '1';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  ...(preview && { assetPrefix: '..' }),
};

export default nextConfig;
