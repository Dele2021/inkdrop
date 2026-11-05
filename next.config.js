/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      '@react-native-async-storage/async-storage': false,
      '@x402/svm/exact/client': false,
    }
    return config
  },
}
module.exports = nextConfig
// cache bust Thu  5 Nov 2026 12:29:06 GMT
