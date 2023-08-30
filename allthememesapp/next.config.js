/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgflip.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'i.kym-cdn.com',
        port: '',
        pathname: '/**'
      }
    ],
  },
}

module.exports = nextConfig;
