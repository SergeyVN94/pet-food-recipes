'use client';

import React from 'react';

import dayjs from 'dayjs';
import Link from 'next/link';
import { notFound, usePathname } from 'next/navigation';

import { Avatar } from '@/components/ui';
import { userRolesNamesMap } from '@/constants';
import { useUser } from '@/hooks';
import { cn, getTimeSince } from '@/utils';

const ProfileHeadSkeleton = () => <div className="skeleton w-full h-[12.5rem] cursor-progress" />;

const ProfileItem = ({ label, value }: { label: string; value: string }) => (
  <p className="body-m mt-2">
    {label} <span className="label-l text-primary">{value}</span>
  </p>
);

const MenuItem = ({ label, link }: { label: string; link: string }) => {
  const pathName = usePathname();

  const selectedClasses = pathName === link ? 'border-on-surface' : 'border-transparent';

  return (
    <Link
      href={link}
      className={cn(
        'body-l text-on-surface py-2 px-3 bg-surf-cont hover:bg-surf-cont-highest transition-colors cursor-pointer border-b',
        selectedClasses,
      )}
    >
      {label}
    </Link>
  );
};

const ProfileHead = () => {
  const { data: user, isFetching, error } = useUser();
  const registrationDate = React.useMemo(() => {
    if (!user?.createdAt) {
      return '';
    }

    const date = dayjs(user?.createdAt ?? 0);
    const formattedDate = date.format('DD.MM.YYYY HH:mm');

    return `${formattedDate} (${getTimeSince(user.createdAt)})`;
  }, [user]);

  React.useLayoutEffect(() => {
    if (error) {
      notFound();
    }
  }, [error]);

  return isFetching || !user ? (
    <ProfileHeadSkeleton />
  ) : (
    <div className="flex flex-col gap-4 elevation-3 p-4">
      <Avatar user={user} size={144} />
      <div>
        <p className="title-l">{user.userName}</p>
        <ProfileItem label="Роль" value={userRolesNamesMap[user.role]} />
        <ProfileItem label="Почта" value={user.email} />
        <ProfileItem label="Дата регистрации" value={registrationDate} />
      </div>
      <nav className="flex flex-nowrap items-center">
        <MenuItem label="Мои рецепты" link="/profile" />
        <MenuItem label="Закладки" link="/profile/bookmarks" />
        <MenuItem label="Уведомления" link="/profile/notifications" />
        <MenuItem label="Настройки" link="/profile/settings" />
      </nav>
    </div>
  );
};

export default ProfileHead;
