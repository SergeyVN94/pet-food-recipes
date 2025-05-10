const imagesRemotePatterns = [process.env.NEXT_PUBLIC_STATIC_SERVER_URL, process.env.NEXT_PUBLIC_API_SERVER_URL].reduce((acc, urlStr) => {
  try {
    const url = new URL(urlStr);

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
  redirects: async () => [
    {
      source: '/user',
      destination: '/404',
      permanent: true,
    },
    {
      source: '/admin',
      destination: '/admin/users',
      permanent: true,
    },
    {
      source: '/user/:id',
      destination: '/user/:id/recipes',
      permanent: true,
    },
    {
      source: '/user/:id/settings',
      destination: '/user/:id/settings/info',
      permanent: true,
    },
    {
      source: '/admin',
      destination: '/admin/users',
      permanent: true,
    },
  ],
  env: {
    NEXT_PUBLIC_API_SERVER_URL: process.env.NEXT_PUBLIC_API_SERVER_URL ?? 'http://localhost:8000',
    NEXT_PUBLIC_STATIC_SERVER_URL: process.env.NEXT_PUBLIC_STATIC_SERVER_URL ?? 'http://localhost:9000',
    NEXT_PUBLIC_YANDEX_METRIKA_ID: process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID ?? '',
    NEXT_PUBLIC_BUCKET_AVATARS: process.env.NEXT_PUBLIC_BUCKET ?? 'recipes',
  },
};

module.exports = nextConfig;
