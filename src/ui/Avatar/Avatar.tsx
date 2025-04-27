'use client';

import React from 'react';

import Image from 'next/image';

import { UserDto } from '@/types';
import { cn } from '@/utils';

type AvatarProps = {
  user: UserDto;
  size?: number;
  className?: string;
};

const Avatar = ({ className, user, size = 40 }: AvatarProps) => {
  const handleError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (event.currentTarget.src !== '/user-avatar-placeholder.png') {
      event.currentTarget.src = '/user-avatar-placeholder.png';
    }
  };

  return (
    <Image
      className={cn('rounded-xl block', className)}
      width={size}
      height={size}
      src={user.avatar ?? '/user-avatar-placeholder.png'}
      alt={`Аватар пользователя ${user.userName}`}
      decoding="async"
      onError={handleError}
    />
  );
};

export default Avatar;
