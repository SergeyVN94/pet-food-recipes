'use client';

import React from 'react';

import dayjs from 'dayjs';
import Link from 'next/link';
import { notFound, useParams, usePathname } from 'next/navigation';

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

  console.log(link, pathName);

  const selectedClasses = pathName.startsWith(link) ? 'border-on-surface' : 'border-transparent';

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
  const { id } = useParams<{ id: string }>();
  const { data: selfUser, isFetching: isSelfUserFetching } = useUser();
  const {
    data: user,
    isFetching: isUserFetching,
    error: userError,
  } = useUser(id, {
    enabled: (!isSelfUserFetching && !selfUser) || (selfUser && selfUser.id !== id),
  });

  const isFetching = isSelfUserFetching || isUserFetching;
  const isSelfUser = selfUser?.id === id;

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

  return isFetching || !user ? (
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
      <nav className="flex flex-nowrap items-center">
        <MenuItem label={isSelfUser ? 'Мои рецепты' : 'Рецепты'} link={`/user/${id}/recipes`} />
        <MenuItem label="Закладки" link={`/user/${id}/bookmarks`} />
        {isSelfUser && <MenuItem label="Уведомления" link={`/user/${id}/notifications`} />}
        {isSelfUser && <MenuItem label="Настройки" link={`/user/${id}/settings`} />}
      </nav>
    </div>
  );
};

export default ProfileHead;
