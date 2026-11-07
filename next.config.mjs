/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Next's image optimizer has unpatched critical advisories on 14.x (see npm audit):
    // it stays off until the migration to Next 15.5+. Images are served as they are,
    // so keep them at a sensible size.
    unoptimized: true,
  },
};

export default nextConfig;
