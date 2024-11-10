'use client';

import React from 'react';

import Link from 'next/link';
import { FormProvider, useForm } from 'react-hook-form';

import { IconEyeClosed, IconEyeOpen } from '@/assets/icons';
import { Button, InputUncontrolled } from '@/components/ui';

import { RegisterFormFields } from '../Auth.types';

const RegistrationPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const methods = useForm<RegisterFormFields>();
  const icon = showPassword ? <IconEyeOpen className="size-6" /> : <IconEyeClosed className="size-6" />;
  const passwordFieldType = showPassword ? 'text' : 'password';

  const handleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = (formFields: RegisterFormFields) => {
    console.log(formFields);
  };

  return (
    <>
      <h1 className="headline-l mb-5">Регистрация</h1>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)} className="flex flex-col gap-4 w-full">
          <InputUncontrolled name="userName" required label="Имя пользователя" />
          <InputUncontrolled name="email" type="email" required label="Электронная почта" />
          <InputUncontrolled
            name="password"
            type={passwordFieldType}
            iconRight={icon}
            onRightButtonClick={handleShowPassword}
            required
            label="Пароль"
          />
          <InputUncontrolled
            name="confirmPassword"
            type={passwordFieldType}
            iconRight={icon}
            onRightButtonClick={handleShowPassword}
            required
            label="Подтвердите пароль"
          />
          <Button type="submit">Зарегистрироваться</Button>
        </form>
      </FormProvider>
      <p className="body-l mt-4">
        Уже зарегистрированы?{' '}
        <Link href="/auth/login" className="link">
          Войти
        </Link>
      </p>
    </>
  );
};

export default RegistrationPage;
