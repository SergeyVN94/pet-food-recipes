'use client';

import React from 'react';

import { observer } from 'mobx-react-lite';

import { ButtonLink } from '@/components/ui';
import { useAuthStore } from '@/hooks';

const AuthSection = observer(() => {
  const authStore = useAuthStore();

  return authStore.userName ? (
    <div>
      <p className="headline-l">{authStore.userName}</p>
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
});

export default AuthSection;
