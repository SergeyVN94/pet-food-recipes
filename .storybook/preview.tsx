import React from 'react';

import type { Decorator, Preview } from '@storybook/react';
import { Roboto } from 'next/font/google';

import '../src/styles/globals.css';

const roboto = Roboto({ weight: ['100', '300', '400', '500', '700', '900'], subsets: ['latin'] });

const GlobalDecorator: Decorator = Story => (
  <div className={roboto.className}>
    <Story />
  </div>
);

const preview: Preview = {
  parameters: {
    actions: {
      argTypesRegex: '^on[A-Z].*',
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  decorators: [GlobalDecorator],
};

export default preview;
