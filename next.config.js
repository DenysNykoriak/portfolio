/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    emotion: true,
  },
  env: {
    API_URL: "https://nykoriakdenys.com/",
  },
};

module.exports = nextConfig;
