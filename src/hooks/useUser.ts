import { QueryFunction, UseQueryOptions, useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { usersService } from '@/services';
import { UserDto } from '@/types';

type QueryKey = [string, string, UserDto['id']?];

const retryFn = (failureCount: number, error: unknown) => {
  if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 404)) {
    return false;
  }

  return failureCount < 2;
};

const queryFn: QueryFunction<UserDto, QueryKey> = async ({ signal, queryKey }) =>
  (await usersService.getUser(queryKey[2], { signal })).data;

const useUser = (userId?: UserDto['id'], config: Omit<UseQueryOptions<UserDto, unknown, UserDto, QueryKey>, 'queryKey' | 'queryFn'> = {}) =>
  useQuery({
    queryFn,
    queryKey: ['users', 'get-by-id', userId],
    retry: retryFn,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    ...config,
  });

export default useUser;
