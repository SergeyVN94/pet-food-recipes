import { UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { bansService } from '@/services';
import { BanCreateDto, BanDto } from '@/types';

type MutationVariables = {
  userId: string;
  dto: BanCreateDto;
};

const mutationFn = async ({ userId, dto }: MutationVariables) => (await bansService.ban(userId, dto)).data;

const useBan = (
  config: Omit<UseMutationOptions<BanDto, AxiosError<{ message: string }>, MutationVariables>, 'mutationKey' | 'mutationFn'> = {},
) => {
  const queryClient = useQueryClient();

  return useMutation<BanDto, AxiosError<{ message: string }>, MutationVariables>({
    mutationFn,
    mutationKey: ['ban', 'create'],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
        exact: false,
      });
    },
    ...config,
  });
};

export default useBan;
