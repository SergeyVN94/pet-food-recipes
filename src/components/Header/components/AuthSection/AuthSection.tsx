'use client';

import React from 'react';

import { ButtonLink } from '@/components/ui';
import { useUser } from '@/hooks';

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
