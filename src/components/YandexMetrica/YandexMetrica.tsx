'use client';

import React from 'react';

import { usePathname, useSearchParams } from 'next/navigation';

import { yandexMetrica } from '@/utils';

const YandexMetrica = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  React.useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    yandexMetrica('hit', url);
  }, [pathname, searchParams]);

  return <></>;
};

export default YandexMetrica;
