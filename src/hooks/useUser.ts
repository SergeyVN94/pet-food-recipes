import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { UserService } from '@/services';
import { UserDto } from '@/types';

const useUser = (config: Omit<UseQueryOptions<UserDto, unknown, UserDto, ['user']>, 'queryKey' | 'queryFn'> = {}) =>
  useQuery({
    queryKey: ['user'],
    queryFn: async ({ signal }) => (await UserService.getUser({ signal })).data,
    retry: (failureCount, error) => {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        return false;
      }

      return failureCount < 3;
    },
    refetchOnWindowFocus: false,
    ...config,
  });

export default useUser;
