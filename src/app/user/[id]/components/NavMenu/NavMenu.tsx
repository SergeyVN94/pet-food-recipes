'use client';

import React, { Suspense } from 'react';

import { notFound, useParams, usePathname, useRouter } from 'next/navigation';

import { Tabs } from '@/components/ui';
import { useUser } from '@/hooks';

type NavMenuProps = {
  className?: string;
};

const NavMenu = ({ className }: NavMenuProps) => {
  const { id } = useParams<{ id: string }>();
  const pathname = usePathname();
  const navigation = useRouter();

  const { data: selfUser, isFetching: isSelfUserFetching } = useUser();
  const isSelfUser = selfUser?.id === id;
  const { error: userError } = useUser(id, {
    enabled: (!isSelfUserFetching && !selfUser) || (selfUser && !isSelfUser),
  });

  const tabs = [
    {
      label: 'Рецепты',
      id: `/user/${id}/recipes`,
    },
    {
      label: 'Закладки',
      id: `/user/${id}/bookmarks`,
    },
  ];

  if (isSelfUser) {
    tabs.push(
      {
        label: 'Уведомления',
        id: `/user/${id}/notifications`,
      },
      {
        label: 'Настройки',
        id: `/user/${id}/settings`,
      },
    );
  }

  React.useLayoutEffect(() => {
    if (userError) {
      notFound();
    }
  }, [userError]);

  return (
    <Tabs
      className={className}
      activeTabId={pathname.split('/').slice(0, 4).join('/')}
      tabs={tabs}
      onTabClick={id => navigation.push(id)}
    />
  );
};

const NavMenuWrapper = (props: NavMenuProps) => (
  <Suspense fallback={<></>}>
    <NavMenu {...props} />
  </Suspense>
);

export default NavMenuWrapper;
