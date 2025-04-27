'use client';

import React from 'react';

import { vestResolver } from '@hookform/resolvers/vest';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { create, enforce, test } from 'vest';

import { IconEyeClosed, IconEyeOpen } from '@/assets/icons';
import { useLogin, useSendConfirmationEmail, useStore } from '@/hooks';
import { Button, InputUncontrolled } from '@/ui';

import { LoginFormFields } from '../Auth.types';
import { SendEmailButton } from './components';

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
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = React.useState(false);
  const isSending = useSendConfirmationEmail().isPending;

  const methods = useForm<LoginFormFields>({
    resolver: vestResolver<LoginFormFields, unknown>(validationSuite),
  });
  const {
    isPending: isLogging,
    mutateAsync: login,
    error,
  } = useLogin({
    onError: error => {
      if (axios.isAxiosError(error)) {
        if (error?.response?.data?.message === 'LOGIN_OR_PASSWORD_INCORRECT') {
          methods.setError('email', {
            type: 'validate',
            message: 'Некорректный пользователь или пароль',
          });
        }
      }
    },
    onSuccess: loginData => {
      if (loginData) {
        store.authStore.login(loginData.accessToken, loginData.refreshToken);

        const redirect = searchParams.get('redirect');
        navigate.push(redirect || '/');
      }
    },
  });

  const isLoading = isLogging || isSending;

  const handleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = (formFields: LoginFormFields) => {
    if (isLoading) {
      return;
    }

    login(formFields);
  };

  return (
    <>
      <Head>
        <title>Авторизация</title>
      </Head>
      <h1 className="headline-l mb-5">Авторизация</h1>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)} className="flex flex-col gap-4 w-full">
          <InputUncontrolled name="email" type="email" label="Электронная почта" disabled={isLoading} autoComplete="email" />
          <InputUncontrolled
            name="password"
            label="Пароль"
            type={showPassword ? 'text' : 'password'}
            iconRight={showPassword ? <IconEyeOpen className="size-6" /> : <IconEyeClosed className="size-6" />}
            onRightButtonClick={handleShowPassword}
            disabled={isLoading}
            autoComplete="password"
          />
          <Button type="submit" disabled={isLoading}>
            Войти
          </Button>
        </form>
      </FormProvider>
      {error && axios.isAxiosError(error) && error.response?.data?.message === 'EMAIL_NOT_VERIFIED' && (
        <div className="flex flex-col mt-4 gap-2">
          <p className="label-l text-error text-pretty">
            Вы не подтвердили почту. Если вы не получили письмо, нажмите на кнопку &quot;Отправить повторно&quot;.
          </p>
          <SendEmailButton email={methods.getValues().email} />
        </div>
      )}
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
