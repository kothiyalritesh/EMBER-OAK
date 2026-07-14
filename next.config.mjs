/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/EMBER-OAK',
  trailingSlash: true,
  transpilePackages: ['three'],
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },
};

export default nextConfig;
