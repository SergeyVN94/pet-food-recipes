'use client';

import React from 'react';

import { useQueryState } from 'nuqs';

import { SearchBar, UserCard } from '@/components';
import { useUsers } from '@/hooks';
import { SearchDto } from '@/types';

const UsersPage = () => {
  const [search] = useQueryState('q');

  const filters = React.useMemo(() => {
    const filters: SearchDto = {};

    if (search) {
      filters.q = search;
    }

    return filters;
  }, [search]);

  const { data: usersResponse } = useUsers(filters);

  return (
    <div>
      <SearchBar placeholder="Поиск пользователей" searchParamName="q" delay={350} />
      <ul className="mt-8 flex flex-col gap-3">
        {usersResponse?.items?.map(user => (
          <li key={user.id}>
            <UserCard user={user} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
