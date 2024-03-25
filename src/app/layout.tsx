import { ReactNode } from 'react';
import { Roboto } from 'next/font/google';
import 'normalize.css';

import '@/styles/globals.css';
import TanStackProvider from './TanStackProvider';

const roboto = Roboto({
  variable: '--font-roboto',
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
});

export const metadata = {
  title: 'Рецепты',
  description: 'Сайт с разными рецептами',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru" className="h-full">
      <body className={`${roboto.variable} h-full`}>
        <TanStackProvider>{children}</TanStackProvider>
      </body>
    </html>
  );
}
