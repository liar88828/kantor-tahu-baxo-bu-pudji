/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  // reactStrictMode: true,
  // // Enable the React DevTools profiler
  // profiler: true,
  // reactStrictMode: true,
  images: {
    domains: [ "localhost", "dummyimage.com" ]
  },
}

module.exports = nextConfig
