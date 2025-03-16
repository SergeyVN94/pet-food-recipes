'use client';

import React from 'react';

import axios from 'axios';
import { FormProvider, useForm } from 'react-hook-form';

import { Button, Modal, SelectItem, SelectUncontrolled, TextareaUncontrolled } from '@/components/ui';
import { useBan, useUser } from '@/hooks';
import { BanCreateDto, UserDto, UserRoles } from '@/types';
import { showToast } from '@/utils';

const selectItems: SelectItem[] = [
  { id: String(1000 * 60 * 60), label: '1 час' },
  { id: String(1000 * 60 * 60 * 3), label: '3 часа' },
  { id: String(1000 * 60 * 60 * 6), label: '6 часа' },
  { id: String(1000 * 60 * 60 * 24), label: '1 день' },
  { id: String(1000 * 60 * 60 * 24 * 3), label: '3 дня' },
  { id: String(1000 * 60 * 60 * 24 * 7), label: 'неделя' },
  { id: String(1000 * 60 * 60 * 24 * 14), label: '2 недели' },
  { id: String(1000 * 60 * 60 * 24 * 30), label: 'месяц' },
  { id: String(1000 * 60 * 60 * 24 * 30 * 6), label: '6 месяцев' },
  { id: String(1000 * 60 * 60 * 24 * 30 * 12), label: 'год' },
  { id: String(Infinity), label: 'бессрочно' },
];

type BanUserButtonProps = {
  userId: UserDto['id'];
  className?: string;
};

const BanUserButton = ({ userId, className }: BanUserButtonProps) => {
  const { data: selfUser } = useUser();
  const { data: user } = useUser(userId);
  const [isOpen, setIsOpen] = React.useState(false);
  const { mutateAsync: ban, isPending } = useBan({
    onSuccess: () => {
      showToast('success', 'Пользователь забанен');
      setIsOpen(false);
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
  const methods = useForm<BanCreateDto>();

  const hasAccess = selfUser?.role === UserRoles.ADMIN || selfUser?.role === UserRoles.MODERATOR;
  const isCurrentUser = user?.id === selfUser?.id;
  const isUserBanned = user?.ban;
  const isShow = hasAccess && !isCurrentUser && !isUserBanned;

  const handleSubmit = (data: BanCreateDto) => {
    if (isPending) {
      return;
    }

    const endDate = Number(data.endDate);

    if (endDate === Infinity) {
      data.endDate = undefined;
    } else {
      data.endDate = new Date(Date.now() + endDate).toISOString();
    }

    ban({ userId: user?.id!, dto: data });
  };

  return (
    user &&
    selfUser &&
    isShow && (
      <Modal.Root
        open={isOpen}
        onOpenChange={setIsOpen}
        trigger={
          <Button variant="outline" className={className} disabled={isPending}>
            Забанить
          </Button>
        }
      >
        <Modal.Title>Забанить пользователя</Modal.Title>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmit)}>
            <div className="mt-5 flex flex-col gap-3">
              <SelectUncontrolled name="endDate" label="Дата окончания бана" items={selectItems} />
              <TextareaUncontrolled name="reason" label="Причина" rows={5} />
            </div>
            <Modal.Actions>
              <Modal.ActionClose type="button">Отмена</Modal.ActionClose>
              <Modal.Action type="submit">Забанить</Modal.Action>
            </Modal.Actions>
          </form>
        </FormProvider>
      </Modal.Root>
    )
  );
};

const BanUserButtonWrapper = (props: BanUserButtonProps) => (
  <React.Suspense fallback={<></>}>
    <BanUserButton {...props} />
  </React.Suspense>
);

export default BanUserButtonWrapper;
