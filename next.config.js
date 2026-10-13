/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  webpack: (config) => {
    // Required for wagmi/viem
    config.resolve.fallback = { fs: false, net: false, tls: false };

    // Ignore broken transitive dep from @coinbase/cdp-sdk
    // (Solana x402 payments — not used by InkGhost)
    config.externals = [
      ...(Array.isArray(config.externals) ? config.externals : []),
      { "@x402/svm/exact/client": "commonjs @x402/svm/exact/client" },
    ];

    return config;
  },
};

module.exports = nextConfig;
