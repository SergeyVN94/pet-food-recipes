const staticServerUrl = new URL(process.env.NEXT_STATIC_SERVER_URL);
const staticApiUrl = new URL(process.env.NEXT_BASE_API_URL);
console.log(staticServerUrl.protocol);
const imagesRemotePatterns = [staticServerUrl, staticApiUrl]
  .map((i) =>
    i.hostname
      ? {
          protocol: i.protocol?.slice(0, -1) ?? 'http',
          hostname: i.hostname,
          port: i.port,
        }
      : null,
  )
  .filter(Boolean);

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg')) ?? {};

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        // issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      },
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  images: {
    remotePatterns: imagesRemotePatterns,
  },
  env: {
    NEXT_BASE_API_URL: process.env.NEXT_BASE_API_URL,
    NEXT_STATIC_SERVER_URL: process.env.NEXT_STATIC_SERVER_URL,
  },
};

module.exports = nextConfig;
