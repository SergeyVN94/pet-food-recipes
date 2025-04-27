'use client';

import React from 'react';

import dayjs from 'dayjs';
import Link from 'next/link';

import { BanUserButton, BanUserDeleteButton } from '@/components';
import { userRolesNamesMap } from '@/constants';
import { useUser, useUserRoles } from '@/hooks';
import { UserDto } from '@/types';
import { Avatar } from '@/ui';
import { cn } from '@/utils';

type ProfileItemProps = { label: string; value: string; className?: string; labelClassName?: string };

const ProfileItem = ({ label, value, className, labelClassName }: ProfileItemProps) => (
  <p className={cn('body-m mt-2', className)}>
    {label} <span className={cn('label-l text-primary', labelClassName)}>{value}</span>
  </p>
);

type UserCardProps = {
  user: UserDto;
  className?: string;
};

const UserCard = ({ user, className }: UserCardProps) => {
  const { data: selfUser } = useUser();
  const userRoles = useUserRoles();

  const isHasAccess = userRoles.isAdmin && userRoles.isModerator;

  return user && selfUser ? (
    <div className={cn('flex flex-nowrap items-start gap-4 card-outlined max-sm:flex-col max-sm:gap-3', className)}>
      <Avatar user={user} size={128} />
      <div className="flex flex-col gap-1">
        {isHasAccess && <ProfileItem label="ID" value={user.id} />}
        <Link href={`/user/${user.id}`}>
          <ProfileItem label="Имя" value={user.userName} />
        </Link>
        {user.email && <ProfileItem label="Email" value={user.email} />}
        <ProfileItem label="Роль" value={userRolesNamesMap[user.role]} />
        <ProfileItem label="Дата регистрации" value={user.createdAt ? new Date(user.createdAt).toLocaleString() : ''} />
        {user.ban && (
          <ProfileItem label="Забанен до" value={dayjs(user.ban.endDate).format('DD.MM.YYYY HH:mm')} labelClassName="text-error" />
        )}
        {user.ban && <ProfileItem label="Причина" value={user.ban.reason} />}
        <div className="mt-4 flex flex-nowrap items-center gap-2">
          <BanUserButton userId={user.id} />
          <BanUserDeleteButton userId={user.id} />
        </div>
      </div>
    </div>
  ) : (
    <div className={cn('skeleton w-full h-[12.5rem] cursor-progress', className)} />
  );
};

export default UserCard;
