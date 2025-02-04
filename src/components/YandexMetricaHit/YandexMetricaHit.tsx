'use client';

import React from 'react';

import { usePathname, useSearchParams } from 'next/navigation';

import { yandexMetrica } from '@/utils';

const YandexMetricaHit = () => {
  const pathname = usePathname();

  React.useEffect(() => {
    yandexMetrica('hit', pathname);
  }, [pathname]);

  return <></>;
};

export default YandexMetricaHit;
