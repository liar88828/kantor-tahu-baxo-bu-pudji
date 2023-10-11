/** @type {import('next').NextConfig} */
const nextConfig = {

  experimental: {
    serverActions: true,
    // optimizePackageImports: ['react-icons'],
  },

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

  // output: 'standalone',
  outputFileTracingExcludes: {
    '/_test__': [ './**/*' ],
  },
}

module.exports = nextConfig
