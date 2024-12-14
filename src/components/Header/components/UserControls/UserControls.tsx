'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { Menu } from '@/components/ui';
import { Avatar } from '@/components/ui/Avatar';
import { UserDto } from '@/types';

type UserControlsProps = {
  user: UserDto;
};

const UserControls = (props: UserControlsProps) => {
  const navigate = useRouter();

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
        console.log('Выход');
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
};

export default UserControls;
