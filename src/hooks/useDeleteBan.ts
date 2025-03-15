import { UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { bansService } from '@/services';
import { BanDto } from '@/types';

type MutationVariables = {
  userId: string;
};

const mutationFn = async ({ userId }: MutationVariables) => (await bansService.deleteBan(userId)).data;

const useDeleteBan = (
  config: Omit<UseMutationOptions<BanDto, AxiosError<{ message: string }>, MutationVariables>, 'mutationKey' | 'mutationFn'> = {},
) => {
  const queryClient = useQueryClient();

  return useMutation<BanDto, AxiosError<{ message: string }>, MutationVariables>({
    mutationFn,
    mutationKey: ['ban', 'delete'],
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: ['user', data.user.id],
        exact: true,
      });
    },
    ...config,
  });
};

export default useDeleteBan;
