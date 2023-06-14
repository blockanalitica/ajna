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
};

module.exports = nextConfig;
