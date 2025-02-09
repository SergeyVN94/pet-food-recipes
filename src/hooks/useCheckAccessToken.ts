import { QueryFunction, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { AuthService } from '@/services';

type QueryKey = ['auth', 'check-access-token'];

const queryFn: QueryFunction<{ message: 'OK' }, QueryKey> = async ({ signal, queryKey }) =>
  (await AuthService.checkAccessToken({ signal })).data;

const useCheckAccessToken = (
  config: Omit<UseQueryOptions<{ message: 'OK' }, AxiosError, { message: 'OK' }, QueryKey>, 'queryKey' | 'queryFn'> = {},
) =>
  useQuery({
    queryFn,
    queryKey: ['auth', 'check-access-token'],
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
    retry: 1,
    ...config,
  });

export default useCheckAccessToken;
