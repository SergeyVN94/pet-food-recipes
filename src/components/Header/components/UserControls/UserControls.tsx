'use client';

import React from 'react';

import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';

import { IconBookmarkBorder, IconLogout, IconNotificationBorder, IconPersonOutline, IconSettings } from '@/assets/icons';
import { Avatar, Menu } from '@/components/ui';
import { useStore } from '@/hooks';
import { UserDto } from '@/types';

type UserControlsProps = {
  user: UserDto;
};

const UserControls = observer(({ user }: UserControlsProps) => {
  const navigate = useRouter();
  const store = useStore();

  const menuItems = [
    {
      label: 'Профиль',
      icon: <IconPersonOutline className="size-6 text-primary" />,
      onSelect: () => {
        navigate.push(`/profile`);
      },
    },
    {
      label: 'Закладки',
      icon: <IconBookmarkBorder className="size-6 text-primary" />,
      onSelect: () => {
        navigate.push(`/profile/bookmarks`);
      },
    },
    {
      label: 'Уведомления',
      icon: <IconNotificationBorder className="size-6 text-primary" />,
      onSelect: () => {
        navigate.push(`/profile/notifications`);
      },
    },
    {
      label: 'Настройки',
      icon: <IconSettings className="size-6 text-primary" />,
      onSelect: () => {
        navigate.push(`/profile/settings`);
      },
    },
    {
      label: 'Выход',
      icon: <IconLogout className="size-6 text-primary" />,
      onSelect: () => {
        store.authStore.logout();
        window?.location.reload();
      },
    },
  ];

  return (
    <Menu
      trigger={<Avatar user={user} className="cursor-pointer" />}
      contentProps={{
        side: 'bottom',
        align: 'end',
        sideOffset: 10,
        className: 'min-w-[13.5rem]',
      }}
      itemSize="sm"
      items={menuItems}
    />
  );
});

UserControls.displayName = 'UserControls';

export default UserControls;
