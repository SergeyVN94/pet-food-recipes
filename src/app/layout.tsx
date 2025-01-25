import React, { Suspense } from 'react';

import { Roboto } from 'next/font/google';
import Head from 'next/head';
import Script from 'next/script';
import 'normalize.css';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { AskCookie, YandexMetrica } from '@/components';
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
      <Script id="metrika-counter" strategy="afterInteractive">
        {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(${Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID)}, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true
            });`}
      </Script>
      <noscript>
        <div>
          <img src="https://mc.yandex.ru/watch/99654607" className="absolute -left-[9999px]" alt="" />
        </div>
      </noscript>
      <Suspense fallback={<></>}>
        <YandexMetrica />
      </Suspense>
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
