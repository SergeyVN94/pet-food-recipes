const imagesRemotePatterns = [process.env.NEXT_PUBLIC_STATIC_SERVER_URL, process.env.NEXT_PUBLIC_API_SERVER_URL].reduce((acc, url) => {
  try {
    const url = new URL(url);

    if (url.hostname) {
      acc.push({
        protocol: url.protocol?.slice(0, -1) ?? 'http',
        hostname: url.hostname,
        port: url.port,
      });
    }
  } catch (e) {}

  return acc;
}, []);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  productionBrowserSourceMaps: false,
  webpack: config => {
    const fileLoaderRule = config.module.rules.find(rule => rule.test?.test?.('.svg')) ?? {};

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
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
  redirects: async () => {
    return [
      {
        source: '/profile',
        destination: '/profile/recipes',
        permanent: true,
      },
      {
        source: '/profile/settings',
        destination: '/profile/settings/info',
        permanent: true,
      },
    ];
  },
  env: {
    NEXT_PUBLIC_API_SERVER_URL: process.env.NEXT_PUBLIC_API_SERVER_URL ?? 'http://localhost:8000',
    NEXT_PUBLIC_STATIC_SERVER_URL: process.env.NEXT_PUBLIC_STATIC_SERVER_URL ?? 'http://localhost:9000',
  },
};

module.exports = nextConfig;
