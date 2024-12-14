import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import { UserService } from '@/services';
import { UserDto } from '@/types';

const useUser = (config: Omit<UseQueryOptions<UserDto, unknown, UserDto, ['user']>, 'queryKey' | 'queryFn'> = {}) =>
  useQuery({
    queryKey: ['user'],
    queryFn: async ({ signal }) => (await UserService.getUser({ signal })).data,
    ...config,
  });

export default useUser;
