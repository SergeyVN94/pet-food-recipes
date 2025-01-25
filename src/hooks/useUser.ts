import { QueryFunction, UseQueryOptions, useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { UserService } from '@/services';
import { UserDto } from '@/types';

import useStore from './useStore';

const retryFn = (failureCount: number, error: unknown) => {
  if (axios.isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 404)) {
    return false;
  }

  return failureCount < 3;
};

const queryFn: QueryFunction<UserDto, ['user']> = async ({ signal }) => (await UserService.getUser({ signal })).data;

const useUser = (config: Omit<UseQueryOptions<UserDto, unknown, UserDto, ['user']>, 'queryKey' | 'queryFn'> = {}) => {
  const authStore = useStore().authStore;

  return useQuery({
    queryFn,
    queryKey: ['user'],
    retry: retryFn,
    refetchOnWindowFocus: false,
    enabled: authStore.isAuthenticated,
    staleTime: Infinity,
    ...config,
  });
};

export default useUser;
