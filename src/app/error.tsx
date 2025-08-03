'use client';

import React from 'react';

import { IconArrowBack } from '@/assets/icons';
import { Button, ButtonLink } from '@/ui';

export const metadata = {
  title: '500 - Server Error',
  description: 'Server Error',
};

type Page500Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

const Page500 = ({ error, reset }: Page500Props) => {
  const isForbidden = error?.message?.includes('Request failed with status code 401');

  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center w-full pt-4 gap-3 h-screen bg-surf">
      <h1 className="headline-l">{isForbidden ? '403 - Доступ запрещен' : '500 - Произошла ошибка'}</h1>
      <div className="flex gap-2">
        {!isForbidden && (
          <Button variant="filled" onClick={reset}>
            Попробовать снова
          </Button>
        )}
        <ButtonLink href="/" variant="text" iconLeft={<IconArrowBack className="size-6" />}>
          На главную
        </ButtonLink>
      </div>
    </div>
  );
};

export default Page500;
