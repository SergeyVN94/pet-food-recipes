'use client';

import React from 'react';

import { usePathname, useSearchParams } from 'next/navigation';

import { yandexMetrica } from '@/utils';

const YandexMetrikaHit = () => {
  const pathname = usePathname();

  React.useEffect(() => {
    yandexMetrica('hit', pathname);
  }, [pathname]);

  return <></>;
};

export default YandexMetrikaHit;
