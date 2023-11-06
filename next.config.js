/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/api/auth/signin',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
