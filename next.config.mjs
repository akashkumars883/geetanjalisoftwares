/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/blogs",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blogs/:slug*",
        destination: "/blog/:slug*",
        permanent: true,
      },
      {
        source: "/portfolio",
        destination: "/case-studies",
        permanent: true,
      },
      {
        source: "/portfolio/:slug*",
        destination: "/case-studies/:slug*",
        permanent: true,
      },
      {
        source: "/privacy",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/terms",
        destination: "/terms-of-service",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
