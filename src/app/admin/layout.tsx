'use client';

import React from 'react';

import dynamic from 'next/dynamic';
import { notFound, usePathname, useRouter } from 'next/navigation';

import { Tabs } from '@/components/ui';
import { useUser } from '@/hooks';
import { PageLayout } from '@/layouts';
import { UserRoles } from '@/types';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: user, isFetching: isUserFetching } = useUser();
  const pathname = usePathname();
  const navigate = useRouter();
  const isAdmin = user?.role === UserRoles.ADMIN;
  const isModerator = user?.role === UserRoles.MODERATOR;
  const isHasAccess = isAdmin || isModerator;

  React.useLayoutEffect(() => {
    if (!isHasAccess && !isUserFetching) {
      notFound();
    }
  }, [isHasAccess, isUserFetching]);

  const content = (
    <div>
      <PageLayout>
        <div>
          <h1 className="title-l text-center">Панель администратора</h1>
          <Tabs
            tabs={[
              {
                label: 'Пользователи',
                id: '/admin/users',
              },
              {
                label: 'Рецепты',
                id: '/admin/recipes',
              },
            ]}
            activeTabId={pathname.endsWith('/') ? pathname.slice(0, -1) : pathname}
            onTabClick={id => navigate.push(id)}
            className="mt-2"
          />
        </div>
        <div className="mt-6">{children}</div>
      </PageLayout>
    </div>
  );

  return isUserFetching ? null : <>{isHasAccess && content}</>;
};

export default dynamic(() => Promise.resolve(AdminLayout), {
  ssr: false,
});
