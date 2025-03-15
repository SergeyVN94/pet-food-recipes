import { QueryFunction, UseQueryOptions, useQuery } from '@tanstack/react-query';

import { usersService } from '@/services';
import { SearchDto, SearchResponseWithPagination, UserDto } from '@/types';

type QueryKey = ['users', 'search', SearchDto?];

const queryFn: QueryFunction<SearchResponseWithPagination<UserDto>, QueryKey> = async ({ queryKey, signal }) => {
  const [, , filter] = queryKey;

  const response = await usersService.findUsers(filter, { signal });

  return response.data;
};

const useUsers = (
  filter?: SearchDto,
  config: Omit<
    UseQueryOptions<SearchResponseWithPagination<UserDto>, unknown, SearchResponseWithPagination<UserDto>, QueryKey>,
    'queryKey' | 'queryFn'
  > = {},
) =>
  useQuery({
    queryFn,
    queryKey: ['users', 'search', filter],
    ...config,
  });

export default useUsers;
