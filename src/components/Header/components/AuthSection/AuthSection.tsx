'use client';

import React from 'react';

import { ButtonLink } from '@/components/ui';
import { useUser } from '@/hooks';

import { UserControls } from '../UserControls';

const AuthSection = () => {
  const { data: user, isLoading } = useUser({
    staleTime: Infinity,
  });

  if (isLoading) {
    return <div className="skeleton w-[2.5rem] h-[2.5rem] cursor-progress rounded-full" />;
  }

  return user ? (
    <UserControls user={user} />
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
