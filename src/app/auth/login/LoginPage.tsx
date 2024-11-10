'use client';

import React from 'react';

import Link from 'next/link';
import { FormProvider, useForm } from 'react-hook-form';

import { IconEyeClosed, IconEyeOpen } from '@/assets/icons';
import { Button, InputUncontrolled } from '@/components/ui';

import { LoginFormFields } from '../Auth.types';

const LoginPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const methods = useForm<LoginFormFields>();

  const handleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = (formFields: LoginFormFields) => {
    console.log(formFields);
  };

  return (
    <>
      <h1 className="headline-l mb-5">Авторизация</h1>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)} className="flex flex-col gap-4 w-full">
          <InputUncontrolled name="email" type="email" required label="Электронная почта" />
          <InputUncontrolled
            name="password"
            type={showPassword ? 'text' : 'password'}
            iconRight={showPassword ? <IconEyeOpen className="size-6" /> : <IconEyeClosed className="size-6" />}
            onRightButtonClick={handleShowPassword}
            required
            label="Пароль"
          />
          <Button type="submit">Войти</Button>
        </form>
      </FormProvider>
      <p className="body-l mt-4">
        Нет аккаунта?{' '}
        <Link href="/auth/registration" className="text-primary font-bold underline">
          Зарегистрироваться
        </Link>
      </p>
    </>
  );
};

export default LoginPage;
