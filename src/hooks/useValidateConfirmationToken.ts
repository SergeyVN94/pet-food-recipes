import { QueryFunction, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { AuthService } from '@/services';

type QueryKey = ['account', 'confirmation-token', string | null | undefined];
type ResponseDto = {
  message: 'EMAIL_VERIFIED';
};

const queryFn: QueryFunction<ResponseDto, QueryKey> = async ({ queryKey }) =>
  (await AuthService.validateConfirmationToken(queryKey[2]!)).data;

const useValidateConfirmationToken = (
  token?: string | null,
  options: Omit<UseQueryOptions<ResponseDto, AxiosError<{ message?: string }>, ResponseDto, QueryKey>, 'queryKey' | 'queryFn'> = {},
) =>
  useQuery({
    queryKey: ['account', 'confirmation-token', token],
    queryFn,
    enabled: Boolean(token),
    ...options,
  });

export default useValidateConfirmationToken;
