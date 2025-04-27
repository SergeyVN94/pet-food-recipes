'use client';

import React from 'react';

import { useUser } from '@/hooks';
import { ButtonLink } from '@/ui';

import { UserControls } from '../UserControls';

const AuthSection = () => {
  const { data: user } = useUser();

  return user ? (
    <UserControls user={user} className="mr-2" />
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
