'use client';

import React from 'react';

import { vestResolver } from '@hookform/resolvers/vest';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { create, enforce, test } from 'vest';

import { IconEyeClosed, IconEyeOpen } from '@/assets/icons';
import { Button, InputUncontrolled } from '@/components/ui';
import { useLogin, useStore } from '@/hooks';

import { LoginFormFields } from '../Auth.types';

const validationSuite = create((data: Partial<LoginFormFields> = {}) => {
  test('email', 'Заполните поле', () => {
    enforce(data.email).isNotEmpty();
  });

  test('email', 'Некорректный email', () => {
    enforce(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        data.email?.toLowerCase() ?? '',
      ),
    ).equals(true);
  });

  test('password', 'Заполните поле', () => {
    enforce(data.password).isNotEmpty();
  });
});

const LoginPage = () => {
  const store = useStore();
  const navigate = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);

  const methods = useForm<LoginFormFields>({
    resolver: vestResolver<LoginFormFields, unknown>(validationSuite),
  });

  const { isPending, mutateAsync: login, data: loginData, error } = useLogin();

  const handleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = (formFields: LoginFormFields) => {
    if (isPending) {
      return;
    }

    login(formFields);
  };

  React.useEffect(() => {
    if (error?.response?.data?.message === 'User or password incorrect') {
      methods.setError('email', {
        type: 'validate',
        message: 'Некорректный пользователь или пароль',
      });
    }
  }, [error, methods]);

  React.useEffect(() => {
    if (loginData) {
      store.authStore.login(loginData.accessToken, loginData.refreshToken);
      navigate.push('/');
    }
  }, [loginData, navigate, store.authStore]);

  return (
    <>
      <h1 className="headline-l mb-5">Авторизация</h1>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)} className="flex flex-col gap-4 w-full">
          <InputUncontrolled name="email" type="email" label="Электронная почта" disabled={isPending} autoComplete="email" />
          <InputUncontrolled
            name="password"
            label="Пароль"
            type={showPassword ? 'text' : 'password'}
            iconRight={showPassword ? <IconEyeOpen className="size-6" /> : <IconEyeClosed className="size-6" />}
            onRightButtonClick={handleShowPassword}
            disabled={isPending}
            autoComplete="password"
          />
          <Button type="submit" disabled={isPending}>
            Войти
          </Button>
        </form>
      </FormProvider>
      <p className="body-l mt-4">
        Нет аккаунта?{' '}
        <Link href="/auth/registration" className="link">
          Зарегистрироваться
        </Link>
      </p>
    </>
  );
};

export default LoginPage;
