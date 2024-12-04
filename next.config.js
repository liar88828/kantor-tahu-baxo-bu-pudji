const { transpilePackages } = require('./next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {

  // experimental: {
  //   serverActions: true,
  // },
  // reactStrictMode: true,
  // // Enable the React DevTools profiler
  // profiler: true,
  // reactStrictMode: true,
  modularizeImports: {
    'react-icons': {
      transform: 'react-icons/{{member}}',
    },
  },
  transpilePackages: ['lucide-react'],// add this
  images: {
    domains: ["localhost", "dummyimage.com"]
  },
}

module.exports = nextConfig
