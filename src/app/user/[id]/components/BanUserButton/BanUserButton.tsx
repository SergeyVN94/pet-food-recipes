'use client';

import React, { Suspense } from 'react';

import axios from 'axios';
import { FormProvider, useForm } from 'react-hook-form';

import { Button, InputUncontrolled } from '@/components/ui';
import { useBan, useUser } from '@/hooks';
import { BanCreateDto, UserDto, UserRoles } from '@/types';
import { hideToast, showToast } from '@/utils';

type BanUserButtonProps = {
  userId: UserDto['id'];
  className?: string;
};

const BanUserButton = ({ userId, className }: BanUserButtonProps) => {
  const { data: selfUser } = useUser();
  const { data: user } = useUser(userId);
  const { mutateAsync: ban, isPending } = useBan({
    onSuccess: () => {
      showToast('success', 'Пользователь забанен');
      hideToast('ban-user');
    },
    onError: error => {
      if (error) {
        let message = 'Что-то пошло не так';

        if (axios.isAxiosError(error) && error.response?.data?.message === 'USER_ALREADY_BANNED') {
          message = 'Пользователь уже забанен';
        }

        showToast('error', message);
      }
    },
  });

  const hasAccess = selfUser?.role === UserRoles.ADMIN || selfUser?.role === UserRoles.MODERATOR;
  const isCurrentUser = user?.id === selfUser?.id;
  const isUserBanned = user?.ban;
  const isShow = hasAccess && !isCurrentUser && !isUserBanned;

  const handleSubmit = (data: BanCreateDto) => {
    if (isPending) {
      return;
    }

    ban({ userId: user?.id!, dto: data });
  };

  const handleBanButtonClick = () => {
    if (isPending) {
      return;
    }

    showToast(
      'default',
      ({ closeToast }) => {
        const methods = useForm<BanCreateDto>();

        const { isPending } = useBan();

        return (
          <div className="p-5">
            <p className="title-l">Забанить пользователя «{user?.userName}»</p>
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(handleSubmit)}>
                <div className="mt-5">
                  <InputUncontrolled name="reason" label="Причина" />
                  <InputUncontrolled name="reason" label="Причина" />
                </div>
                <div className="flex justify-end gap-2 mt-3">
                  <Button variant="filled" type="submit" className="min-w-20" disabled={isPending}>
                    Да
                  </Button>
                  <Button variant="outline" onClick={closeToast} className="min-w-20" disabled={isPending}>
                    Нет
                  </Button>
                </div>
              </form>
            </FormProvider>
          </div>
        );
      },
      { autoClose: false, closeOnClick: false, toastId: 'ban-user' },
    );
  };

  return (
    user &&
    selfUser &&
    isShow && (
      <Button variant="filled" onClick={handleBanButtonClick} className={className}>
        Забанить
      </Button>
    )
  );
};

const BanUserButtonWrapper = (props: BanUserButtonProps) => (
  <Suspense fallback={<></>}>
    <BanUserButton {...props} />
  </Suspense>
);

export default BanUserButtonWrapper;
