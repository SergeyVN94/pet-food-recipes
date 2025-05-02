import type { StorybookConfig } from '@storybook/nextjs';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-onboarding',
    '@storybook/addon-interactions',
    // {
    //   name: '@storybook/addon-styling',
    //   options: {
    //     postCss: {
    //       implementation: require.resolve('postcss'),
    //     },
    //   },
    // },
    '@chromatic-com/storybook',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {},
  webpackFinal(config) {
    const fileLoaderRule =
      config?.module?.rules?.find(rule =>
        //@ts-ignore
        rule?.test?.test?.('.svg'),
      ) ?? ({} as any);

    const finalConfig = {
      ...config,
      resolve: {
        ...config.resolve,
        plugins: [new TsconfigPathsPlugin(), ...(config.resolve?.plugins ?? [])],
      },
      module: {
        ...config.module,
        rules: [
          ...(config.module?.rules ?? []),
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
        ],
      },
    };

    fileLoaderRule.exclude = /\.svg$/i;

    return finalConfig;
  },

  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
};
export default config;
