'use client';

import React from 'react';

import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';

import {
  IconAdminPanelSettings,
  IconBookmarkBorder,
  IconLogout,
  IconNotificationBorder,
  IconPersonOutline,
  IconSettings,
} from '@/assets/icons';
import { useStore } from '@/hooks';
import { UserDto } from '@/types';
import { Avatar, Menu, MenuItem } from '@/ui';
import { cn } from '@/utils';

type UserControlsProps = {
  user: UserDto;
  className?: string;
};

const UserControls = observer(({ user, className }: UserControlsProps) => {
  const navigate = useRouter();
  const store = useStore();
  const isAdmin = user?.role === 'ADMIN';
  const isModerator = user?.role === 'MODERATOR';

  const menuItems: MenuItem[] = [
    {
      label: 'Профиль',
      icon: IconPersonOutline,
      onSelect: () => {
        navigate.push(`/user/${user.id}`);
      },
    },
    {
      label: 'Закладки',
      icon: IconBookmarkBorder,
      onSelect: () => {
        navigate.push(`/user/${user.id}/bookmarks`);
      },
    },
    {
      label: 'Уведомления',
      icon: IconNotificationBorder,
      onSelect: () => {
        navigate.push(`/user/${user.id}/notifications`);
      },
    },
    {
      label: 'Настройки',
      icon: IconSettings,
      onSelect: () => {
        navigate.push(`/user/${user.id}/settings`);
      },
    },
    {
      label: 'Выход',
      icon: IconLogout,
      onSelect: () => {
        store.authStore.logout();
        window?.location.reload();
      },
    },
  ];

  if (isAdmin || isModerator) {
    menuItems.splice(-1, 0, {
      label: 'Панель администратора',
      icon: IconAdminPanelSettings,
      onSelect: () => {
        navigate.push('/admin');
      },
    });
  }

  const trigger = (
    <div className={cn('flex items-center gap-1', className)}>
      <Avatar user={user} className="cursor-pointer" />
      <span className="title-m">{user.userName}</span>
    </div>
  );

  return (
    <Menu
      trigger={trigger}
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
