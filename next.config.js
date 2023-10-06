/** @type {import('next').NextConfig} */
const nextConfig = {

  experimental: {
    serverActions: true,
  },
  // reactStrictMode: true,
  // // Enable the React DevTools profiler
  // profiler: true,
  // reactStrictMode: true,
  modularizeImports: {
    'react-icons': {
      transform: 'react-icons/{{member}}',
    },
  },
  images: {
    domains: [ "localhost", "dummyimage.com" ]
  },
}

module.exports = nextConfig
