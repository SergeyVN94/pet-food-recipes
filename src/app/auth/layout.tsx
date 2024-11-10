import React from 'react';

import Link from 'next/link';

import { IconArrowBack } from '@/assets/icons';

const AuthLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="py-16 flex flex-nowrap justify-center">
    <div className="w-96 max-sm:w-full">
      <Link href="/" className="link mb-4 flex flex-nowrap items-center">
        <IconArrowBack className="mr-2 size-6" />
        На главную страницу
      </Link>
      {children}
    </div>
  </div>
);

export default AuthLayout;
