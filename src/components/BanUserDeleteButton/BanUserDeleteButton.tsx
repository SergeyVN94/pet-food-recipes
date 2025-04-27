'use client';

import React from 'react';

import { useDeleteBan, useUser, useUserRoles } from '@/hooks';
import { UserDto } from '@/types';
import { Button } from '@/ui';
import { showToast } from '@/utils';

type BanUserDeleteButtonProps = {
  userId: UserDto['id'];
  className?: string;
};

const BanUserDeleteButton = ({ userId, className }: BanUserDeleteButtonProps) => {
  const { data: user } = useUser(userId);
  const { data: selfUser } = useUser();
  const userRoles = useUserRoles();
  const { mutateAsync: deleteBan, isPending } = useDeleteBan({
    onMutate: () => {
      showToast('success', 'Пользователь разбанен');
    },
    onError: error => {
      console.error(error);
      showToast('error', 'Что-то пошло не так');
    },
  });

  const isCurrentUser = selfUser?.id === userId;
  const hasAccess = userRoles.isAdmin || userRoles.isModerator;

  const handleDeleteBanClick = () => {
    deleteBan({ userId });
  };

  return (
    user?.ban &&
    selfUser &&
    !isCurrentUser &&
    hasAccess && (
      <Button variant="filled" className={className} onClick={handleDeleteBanClick} disabled={isPending}>
        Разбанить
      </Button>
    )
  );
};

export default BanUserDeleteButton;
