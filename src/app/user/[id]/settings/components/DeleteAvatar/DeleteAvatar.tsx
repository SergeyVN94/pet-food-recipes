'use client';

import React from 'react';

import { useDeleteAvatar, useUser, useUserRoles } from '@/hooks';
import { Button } from '@/ui';
import { showToast } from '@/utils';

type DeleteAvatarProps = {
  userId: string;
  className?: string;
};

const DeleteAvatar = ({ className, userId }: DeleteAvatarProps) => {
  const { mutate, isPending } = useDeleteAvatar({
    onSuccess: () => {
      showToast('success', 'Аватар успешно удален');
    },
    onError: () => {
      showToast('error', 'Что то пошло не так');
    },
  });
  const { isAdmin, isModerator } = useUserRoles();
  const { data: selfUser } = useUser();
  const { data: user } = useUser(userId);
  const hasActionAccess = selfUser?.id === userId || isAdmin || isModerator;

  const handleClick = () => {
    if (isPending) {
      return;
    }

    mutate({ userId: isAdmin || isModerator ? userId : undefined });
  };

  return (
    user?.avatar &&
    hasActionAccess && (
      <Button className={className} onClick={handleClick}>
        Удалить аватар
      </Button>
    )
  );
};

export default DeleteAvatar;
