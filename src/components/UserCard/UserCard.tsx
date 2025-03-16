'use client';

import React from 'react';

import Link from 'next/link';

import { BanUserButton } from '@/components';
import { userRolesNamesMap } from '@/constants';
import { useUser } from '@/hooks';
import { UserDto, UserRoles } from '@/types';
import { cn } from '@/utils';

import { Avatar } from '../ui';

type ProfileItemProps = { label: string; value: string; className?: string; labelClassName?: string };

const ProfileItem = ({ label, value, className, labelClassName }: ProfileItemProps) => (
  <p className={cn('body-m mt-2', className)}>
    {label} <span className={cn('label-l text-primary', labelClassName)}>{value}</span>
  </p>
);

type UserCardProps = {
  userId: UserDto['id'];
  className?: string;
};

const UserCard = ({ userId, className }: UserCardProps) => {
  const { data: user } = useUser(userId);
  const { data: selfUser } = useUser();

  const isCurrentUser = user?.id === selfUser?.id;
  const isHasAccess = selfUser?.role === UserRoles.ADMIN || selfUser?.role === UserRoles.MODERATOR;

  return user && selfUser ? (
    <div className={cn('flex flex-nowrap items-start gap-4 card-outlined', className)}>
      <Avatar user={user} size={128} />
      <div className="flex flex-col gap-1">
        {isHasAccess && <ProfileItem label="ID" value={user.id} />}
        <Link href={`/user/${user.id}`}>
          <ProfileItem label="Имя" value={user.userName} />
        </Link>
        {user.email && <ProfileItem label="Email" value={user.email} labelClassName={isCurrentUser ? 'text-error' : ''} />}
        <ProfileItem label="Роль" value={userRolesNamesMap[user.role]} />
        <ProfileItem label="Дата регистрации" value={user.createdAt ? new Date(user.createdAt).toLocaleString() : ''} />
        <div className="mt-4 flex flex-nowrap items-center gap-2">
          <BanUserButton userId={user.id} />
        </div>
      </div>
    </div>
  ) : (
    <div className={cn('skeleton w-full h-[12.5rem] cursor-progress', className)} />
  );
};

export default UserCard;
