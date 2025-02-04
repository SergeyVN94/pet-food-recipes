import { MutateFunction, UseMutationOptions, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { AuthService } from '@/services';
import { UserDto } from '@/types';

const mutationFn: MutateFunction<UserDto, AxiosError, string> = async (email: string) =>
  (await AuthService.sendConfirmationEmail(email)).data;

const useSendConfirmationEmail = (
  options: Omit<UseMutationOptions<UserDto, AxiosError<{ message?: string; data?: string }>, string>, 'mutationFn' | 'mutationKey'> = {},
) =>
  useMutation({
    mutationKey: ['account', 'send-confirmation-email'],
    mutationFn,
    ...options,
  });

export default useSendConfirmationEmail;
