import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { RecipesService } from '@/services';
import { RecipeEntity, RecipeUpdateDto } from '@/types';

type MutationProps = {
  dto: RecipeUpdateDto;
  slug: RecipeEntity['slug'];
};

const mutationFn = async ({ dto, slug }: MutationProps) => (await RecipesService.patchRecipe(slug, dto)).data;

const useUpdateRecipe = (config: UseMutationOptions<RecipeEntity, unknown, MutationProps, unknown> = {}) =>
  useMutation({
    mutationFn,
    mutationKey: ['recipe', 'update'],
    ...config,
  });

export default useUpdateRecipe;
