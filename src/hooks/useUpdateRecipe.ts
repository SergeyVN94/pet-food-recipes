import { UseMutationOptions, useMutation, useQueryClient } from '@tanstack/react-query';

import { recipesService } from '@/services';
import { RecipeEntity, RecipeUpdateDto } from '@/types';

type MutationProps = {
  dto: RecipeUpdateDto;
  slug: RecipeEntity['slug'];
};

const mutationFn = async ({ dto, slug }: MutationProps) => (await recipesService.patchRecipe(slug, dto)).data;

const useUpdateRecipe = (config: UseMutationOptions<RecipeEntity, unknown, MutationProps, unknown> = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    mutationKey: ['recipe', 'update'],
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      config?.onSuccess?.(data, variables, context);
    },
    ...config,
  });
};

export default useUpdateRecipe;
