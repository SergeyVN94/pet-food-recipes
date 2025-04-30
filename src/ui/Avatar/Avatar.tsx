'use client';

import React from 'react';

import Image from 'next/image';

import { UserDto } from '@/types';
import { cn } from '@/utils';

type AvatarProps = Omit<React.ComponentProps<typeof Image>, 'src' | 'alt'> & {
  user: UserDto;
  size?: number;
  className?: string;
};

const Avatar = ({ className, user, size = 40, ...other }: AvatarProps) => (
  <Image
    className={cn('rounded-xl block object-cover', className)}
    style={{ width: size, height: size, maxWidth: size, maxHeight: size }}
    width={size}
    height={size}
    src={
      user.avatar
        ? `${process.env.NEXT_PUBLIC_STATIC_SERVER_URL}/${process.env.NEXT_PUBLIC_BUCKET_AVATARS}/${user.avatar}`
        : '/user-avatar-placeholder.png'
    }
    alt={`Аватар пользователя ${user.userName}`}
    {...other}
  />
);

export default Avatar;
