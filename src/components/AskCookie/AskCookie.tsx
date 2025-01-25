'use client';

import React from 'react';

import Link from 'next/link';
import { toast } from 'react-toastify';

import { Button } from '../ui';

const AskCookie = () => {
  const isConfirmed = typeof window !== 'undefined' && localStorage.getItem('cookie-confirmation') === 'true';

  React.useLayoutEffect(() => {
    const cookieConfirmation = localStorage.getItem('cookie-confirmation') === 'true';

    if (!cookieConfirmation) {
      toast.info(
        ({ closeToast }) => {
          const handleCloseClick = () => {
            localStorage.setItem('cookie-confirmation', 'true');
            closeToast();
          };

          return (
            <div className="flex flex-nowrap items-center gap-4 w-full py-4 cursor-default">
              <p className="body-l font-medium">
                «Мы используем cookie (файлы с данными о прошлых посещениях сайта) для удобства использования сайта. Я согласен(на) с
                использованием cookies на условиях, указанных в Политике обработки персональных данных (
                <Link href={'/privacy-policy'} target="_blank" className="text-primary underline-offset-2 underline">
                  Политика обработки персональных данных
                </Link>
                )».
              </p>
              <Button onClick={handleCloseClick} variant="elevated">
                Согласен(на)
              </Button>
            </div>
          );
        },
        {
          icon: false,
          autoClose: false,
          closeOnClick: false,
        },
      );
    }
  }, []);

  return <div data-type="ask-cookie" data-state={String(isConfirmed)} suppressHydrationWarning />;
};

export default AskCookie;
