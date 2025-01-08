'use client';

import React from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { Menu } from '../components';

const menuItems = [
  { title: 'Профиль', id: 'info' },
  { title: 'Закладки', id: 'bookmarks' },
];

const SettingsLayout = ({ children }: { children: React.ReactNode }) => {
  const navigation = useRouter();
  const pathname = usePathname();

  const lastPath = pathname.split('/').at(-1);

  return (
    <section className="flex flex-nowrap gap-4">
      <Menu items={menuItems} onClick={id => navigation.push(`/profile/settings/${id}`)} selectedId={lastPath!} />
      {children}
    </section>
  );
};

export default SettingsLayout;
