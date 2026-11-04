/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      '@x402/evm/upto/client': false,
      '@x402/svm/exact/client': false,
      '@x402/evm/exact/client': false,
      '@x402/svm/upto/client': false,
    };
    config.externals = [...(config.externals || []), '@x402/evm', '@x402/svm'];
    return config;
  },
};

module.exports = nextConfig;
