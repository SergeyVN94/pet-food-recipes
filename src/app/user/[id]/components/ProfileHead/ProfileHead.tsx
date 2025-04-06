'use client';

import React from 'react';

import dayjs from 'dayjs';
import { notFound, useParams } from 'next/navigation';

import { BanUserButton, BanUserDeleteButton } from '@/components';
import { Avatar } from '@/components/ui';
import { userRolesNamesMap } from '@/constants';
import { useUser } from '@/hooks';
import { cn, getTimeSince } from '@/utils';

const ProfileHeadSkeleton = () => <div className="skeleton w-full h-[12.5rem] cursor-progress" />;

type ProfileItemProps = { label: string; value: string; className?: string; labelClassName?: string };

const ProfileItem = ({ label, value, className, labelClassName }: ProfileItemProps) => (
  <p className={cn('body-m mt-2', className)}>
    {label} <span className={cn('label-l text-primary', labelClassName)}>{value}</span>
  </p>
);

const ProfileHead = () => {
  const { id } = useParams<{ id: string }>();
  const { data: user, error: userError } = useUser(id);

  const registrationDate = React.useMemo(() => {
    if (!user?.createdAt) {
      return '';
    }

    const date = dayjs(user?.createdAt ?? 0);
    const formattedDate = date.format('DD.MM.YYYY HH:mm');

    return `${formattedDate} (${getTimeSince(user.createdAt)})`;
  }, [user]);

  React.useLayoutEffect(() => {
    if (userError) {
      notFound();
    }
  }, [userError]);

  return !user ? (
    <ProfileHeadSkeleton />
  ) : (
    <div className="flex flex-col gap-4 elevation-3 p-4">
      <Avatar user={user} size={144} />
      <div>
        <p className="title-l">{user.userName}</p>
        <ProfileItem label="Роль" value={userRolesNamesMap[user.role]} />
        {user.email && <ProfileItem label="Почта" value={user.email} />}
        <ProfileItem label="Дата регистрации" value={registrationDate} />
        {user.ban?.endDate && (
          <ProfileItem label="Бан до" value={dayjs(user.ban.endDate).format('DD.MM.YYYY')} labelClassName="text-error" />
        )}
        {user.ban?.reason && <ProfileItem label="Причина бана" value={user.ban.reason} labelClassName="text-error" />}
        <div className="flex items-center gap-2 mt-2">
          <BanUserButton userId={user.id} />
          <BanUserDeleteButton userId={user.id} />
        </div>
      </div>
    </div>
  );
};

export default ProfileHead;
