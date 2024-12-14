'use client';

import React from 'react';

import { UserDto } from '@/types';
import { cn } from '@/utils';

type AvatarProps = {
  user: UserDto;
  className?: string;
};

const Avatar = ({ className, user }: AvatarProps) => {
  const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (event.currentTarget.src !== '/user-avatar-placeholder.png') {
      event.currentTarget.src = '/user-avatar-placeholder.png';
    }
  };

  return (
    <img
      className={cn('size-10 rounded-xl block', className)}
      src={user.avatar ?? '/user-avatar-placeholder.png'}
      alt={`Аватар пользователя ${user.userName}`}
      decoding="async"
      onError={handleError}
    />
  );
};

export default Avatar;
