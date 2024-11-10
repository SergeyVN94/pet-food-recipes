import React from 'react';

import { Roboto } from 'next/font/google';
import 'normalize.css';

import { StoreProvider, TanStackProvider } from '@/providers';
import '@/styles/globals.css';

const roboto = Roboto({
  variable: '--font-roboto',
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
});

export const metadata = {
  title: 'Рецепты',
  description: 'Сайт с разными рецептами',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="ru" className="h-full">
    <body className={`${roboto.variable} h-full`}>
      <StoreProvider>
        <TanStackProvider>{children}</TanStackProvider>
      </StoreProvider>
    </body>
  </html>
);

export default RootLayout;
