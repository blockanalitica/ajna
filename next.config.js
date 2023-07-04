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
        source: "/ethereum",
        destination: "/",
        permanent: true,
      },
      {
        source: "/ethereum/:path*",
        destination: "/:path*",
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/",
        destination: "/ethereum",
      },
      {
        source: "/pools",
        destination: "/ethereum/pools",
      },
      {
        source: "/pools/:slug*",
        destination: "/ethereum/pools/:slug*",
      },
      {
        source: "/tokens",
        destination: "/ethereum/tokens",
      },
      {
        source: "/tokens/:slug*",
        destination: "/ethereum/tokens/:slug*",
      },
      {
        source: "/auctions",
        destination: "/ethereum/auctions",
      },
      {
        source: "/auctions/:slug*",
        destination: "/ethereum/auctions/:slug*",
      },
    ];
  },
};

module.exports = nextConfig;
