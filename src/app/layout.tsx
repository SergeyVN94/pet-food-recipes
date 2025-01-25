import React, { Suspense } from 'react';

import { Roboto } from 'next/font/google';
import Head from 'next/head';
import 'normalize.css';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { AskCookie, YandexMetrica, YandexMetricaHit } from '@/components';
import { StoreProvider, TanStackProvider, ToastProvider } from '@/providers';
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
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
    </Head>
    <body className={`${roboto.variable} h-full`}>
      {process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID && <YandexMetrica metrikaId={process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID} />}
      <Suspense fallback={<></>}>{process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID && <YandexMetricaHit />}</Suspense>
      <AskCookie />
      <TanStackProvider>
        <StoreProvider>
          <NuqsAdapter>
            <ToastProvider>{children}</ToastProvider>
          </NuqsAdapter>
        </StoreProvider>
      </TanStackProvider>
    </body>
  </html>
);

export default RootLayout;
