'use client';

import React from 'react';

import dayjs from 'dayjs';
import { notFound, useParams } from 'next/navigation';

import { Avatar } from '@/components/ui';
import { userRolesNamesMap } from '@/constants';
import { useUser } from '@/hooks';
import { getTimeSince } from '@/utils';

const ProfileHeadSkeleton = () => <div className="skeleton w-full h-[12.5rem] cursor-progress" />;

const ProfileItem = ({ label, value }: { label: string; value: string }) => (
  <p className="body-m mt-2">
    {label} <span className="label-l text-primary">{value}</span>
  </p>
);

const ProfileHead = () => {
  const { id } = useParams<{ id: string }>();
  const { data: selfUser } = useUser();
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

  return !selfUser || !user ? (
    <ProfileHeadSkeleton />
  ) : (
    <div className="flex flex-col gap-4 elevation-3 p-4">
      <Avatar user={user} size={144} />
      <div>
        <p className="title-l">{user.userName}</p>
        <ProfileItem label="Роль" value={userRolesNamesMap[user.role]} />
        {user.email && <ProfileItem label="Почта" value={user.email} />}
        <ProfileItem label="Дата регистрации" value={registrationDate} />
      </div>
    </div>
  );
};

export default ProfileHead;
