/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["icons.blockanalitica.com"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/ethereum",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
