'use client';

import React from 'react';

import { observer } from 'mobx-react-lite';

import { ButtonLink } from '@/components/ui';
import { useUser } from '@/hooks';

const AuthSection = () => {
  const { data: user, isLoading } = useUser({
    staleTime: Infinity,
  });

  if (isLoading) {
    return <div className="skeleton w-[150px] h-[2.5rem] cursor-progress rounded-full" />;
  }

  return user ? (
    <div>
      <p className="headline-m">{user?.userName}</p>
    </div>
  ) : (
    <>
      <ButtonLink href="/auth/login" variant="outline">
        Войти
      </ButtonLink>
      <ButtonLink href="/auth/registration" variant="outline">
        Регистрация
      </ButtonLink>
    </>
  );
};

export default AuthSection;
