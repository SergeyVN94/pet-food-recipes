import { MutateFunction, UseMutationOptions, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { AuthService } from '@/services';
import { UserDto, UserRegistryDto } from '@/types';

const mutationFn: MutateFunction<UserDto, AxiosError, UserRegistryDto> = async (dto: UserRegistryDto) =>
  (await AuthService.createUser(dto)).data;

const useCreateUser = (
  options: Omit<UseMutationOptions<UserDto, AxiosError<{ message?: string }>, UserRegistryDto>, 'mutationFn' | 'mutationKey'> = {},
) =>
  useMutation({
    mutationKey: ['account', 'create'],
    mutationFn,
    ...options,
  });

export default useCreateUser;
