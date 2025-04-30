import { UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { usersService } from '@/services';

type MutationProps = {
  avatar: File;
  axiosConfig?: axios.AxiosRequestConfig;
};

const mutationFn = async ({ avatar, axiosConfig }: MutationProps) => (await usersService.updateAvatar(avatar, axiosConfig)).data;

const useUpdateUserAvatar = (config: UseMutationOptions<string, unknown, MutationProps, unknown> = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    mutationKey: ['users', 'avatar-update'],
    ...config,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['users', 'get-by-id'], exact: false });
      config?.onSuccess?.(data, variables, context);
    },
  });
};

export default useUpdateUserAvatar;
