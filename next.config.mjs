/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    domains: [
      'juvkrpmrmjhhbnhxuwmd.supabase.co',
      'images.unsplash.com',
      'pixabay.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'juvkrpmrmjhhbnhxuwmd.supabase.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.imgur.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pixabay.com',
        pathname: '/**',
      },
    ],
  },

  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'geetanjalisoftwares.in' }],
        destination: 'https://www.geetanjalisoftwares.in/:path*',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
