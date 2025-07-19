import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { authService } from '@/services';
import { TokenResponseDto } from '@/types/auth';

type MutationVariables = {
  email: string;
  password: string;
};

const mutationFn = async ({ email, password }: MutationVariables) => (await authService.login(email, password)).data;

const useLogin = (config: UseMutationOptions<TokenResponseDto, AxiosError<{ message: string }>, MutationVariables> = {}) =>
  useMutation<TokenResponseDto, AxiosError<{ message: string }>, MutationVariables>({
    mutationFn,
    mutationKey: ['auth', 'login'],
    ...config,
  });

export default useLogin;
