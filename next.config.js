/**
 * @type {import('next').NextConfig}
 **/

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['raw.githubusercontent.com'],
  },
  experimental: {
    legacyBrowsers: false,
    browsersListForSwc: true,
    images: {
      allowFutureImage: true,
      unoptimized: true,
    },
  },
};
