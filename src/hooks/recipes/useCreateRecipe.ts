import { UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query';

import { recipesService } from '@/services';
import { RecipeCreateDto, RecipeEntity } from '@/types';

const mutationFn = async (dto: RecipeCreateDto) => (await recipesService.postRecipe(dto)).data;

const useCreateRecipe = (config: UseMutationOptions<RecipeEntity, unknown, RecipeCreateDto, unknown> = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    mutationKey: ['recipe', 'create'],
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      config?.onSuccess?.(data, variables, context);
    },
    ...config,
  });
};

export default useCreateRecipe;
