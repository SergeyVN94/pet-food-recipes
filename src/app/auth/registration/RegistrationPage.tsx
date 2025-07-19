'use client';

import React from 'react';

import { vestResolver } from '@hookform/resolvers/vest';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';
import { create, enforce, test } from 'vest';

import { IconEyeClosed, IconEyeOpen } from '@/assets/icons';
import { useSendConfirmationEmail } from '@/hooks';
import { useCreateUser } from '@/hooks';
import { Button, InputUncontrolled } from '@/ui';
import { showToast } from '@/utils';

import { RegisterFormFields } from '../Auth.types';

const validationSuite = create((data: Partial<RegisterFormFields> = {}) => {
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

  test('password', 'Пароль не должен содержать кириллицу', () => {
    enforce(/[а-яА-Я]/gm.test(data.password ?? '')).equals(false);
  });

  test('password', 'Пароль должен содержать минимум одну заглавную букву, одну строчную букву и одну цифру', () => {
    enforce(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*/gm.test(data.password ?? '')).equals(true);
  });

  test('confirmPassword', 'Заполните поле', () => {
    enforce(data.confirmPassword).isNotEmpty();
  });

  test('confirmPassword', 'Пароли не совпадают', () => {
    enforce(data.confirmPassword).equals(data.password);
  });
});

const RegistrationPage = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const navigate = useRouter();
  const methods = useForm<RegisterFormFields>({
    resolver: vestResolver<RegisterFormFields, unknown>(validationSuite),
  });
  const { mutateAsync: sendConfirmationEmail, isPending: isSending } = useSendConfirmationEmail();
  const {
    mutateAsync: createUser,
    isPending,
    data: createdUser,
  } = useCreateUser({
    onError: error => {
      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message === 'USER_WITH_THIS_EMAIL_EXIST') {
          showToast('error', 'Пользователь с такой почтой уже существует');
        }

        if (error.response?.data?.message === 'USER_WITH_THIS_NAME_EXIST') {
          showToast('error', 'Пользователь с таким именем уже существует');
        }
      }

      console.error(error);
      showToast('error', 'Что-то пошло не так');
    },
    onSuccess: () => {
      sendConfirmationEmail(methods.getValues().email);
      showToast('success', 'Пользователь успешно зарегистрирован, на почту отправлено письмо для подтверждения регистрации');
      navigate.push('/auth/login');
    },
  });
  const icon = showPassword ? IconEyeOpen : IconEyeClosed;
  const passwordFieldType = showPassword ? 'text' : 'password';

  const handleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  const handleSubmit = (formFields: RegisterFormFields) => {
    if (isPending) {
      return;
    }

    createUser(formFields);
  };

  return (
    <>
      <h1 className="headline-l mb-5">Регистрация</h1>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)} className="flex flex-col gap-4 w-full">
          <InputUncontrolled name="userName" required label="Имя пользователя" autoComplete="username" />
          <InputUncontrolled name="email" type="email" required label="Электронная почта" autoComplete="email" />
          <InputUncontrolled
            name="password"
            type={passwordFieldType}
            iconRight={icon}
            onRightButtonClick={handleShowPassword}
            required
            label="Пароль"
            autoComplete="off"
          />
          <InputUncontrolled
            name="confirmPassword"
            type={passwordFieldType}
            iconRight={icon}
            onRightButtonClick={handleShowPassword}
            required
            label="Подтвердите пароль"
            autoComplete="off"
          />
          <Button type="submit" disabled={isPending}>
            Зарегистрироваться
          </Button>
        </form>
      </FormProvider>
      {createdUser && !isSending && (
        <div className="mt-4 flex flex-col gap-2">
          <p className="body-l">Письмо для подтверждения отправлено на почту {createdUser.email}</p>
          <Button onClick={() => sendConfirmationEmail(createdUser.email!)} disabled={isSending}>
            Отправить повторно
          </Button>
        </div>
      )}
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
