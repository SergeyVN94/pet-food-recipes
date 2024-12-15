'use client';

import React from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/navigation';

import { Menu } from '@/components/ui';
import { Avatar } from '@/components/ui/Avatar';
import { useStore } from '@/hooks';
import { UserDto } from '@/types';

type UserControlsProps = {
  user: UserDto;
};

const UserControls = observer((props: UserControlsProps) => {
  const navigate = useRouter();
  const store = useStore();
  const queryClient = useQueryClient();

  const menuItems = [
    {
      label: 'Профиль',
      onSelect: () => {
        navigate.push('/profile');
      },
    },
    {
      label: 'Закладки',
      onSelect: () => {
        navigate.push('/bookmarks');
      },
    },
    {
      label: 'Уведомления',
      onSelect: () => {
        navigate.push('/notifications');
      },
    },
    {
      label: 'Настройки',
      onSelect: () => {
        navigate.push('/settings');
      },
    },
    {
      label: 'Выход',
      onSelect: () => {
        store.authStore.logout();
        window?.location.reload();
      },
    },
  ];

  return (
    <Menu
      trigger={<Avatar user={props.user} className="cursor-pointer" />}
      contentProps={{
        side: 'bottom',
        align: 'end',
        sideOffset: 10,
      }}
      itemSize="sm"
      items={menuItems}
    />
  );
});

UserControls.displayName = 'UserControls';

export default UserControls;
