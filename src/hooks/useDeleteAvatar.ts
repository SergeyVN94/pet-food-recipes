import { UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query';

import { usersService } from '@/services';
import { UserDto } from '@/types';

type MutationProps = {
  userId?: UserDto['id'];
};

const mutationFn = async ({ userId }: MutationProps) => (await usersService.deleteAvatar(userId)).data;

const useDeleteAvatar = (config: UseMutationOptions<void, unknown, MutationProps, unknown> = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    mutationKey: ['users', 'avatar-delete'],
    ...config,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['users', 'get-by-id'], exact: false });
      config?.onSuccess?.(data, variables, context);
    },
  });
};

export default useDeleteAvatar;
