import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { RecipesService } from '@/services';
import { RecipeDto, RecipeUpdateDto } from '@/types';

type MutationProps = {
  dto: RecipeUpdateDto;
  slug: RecipeDto['slug'];
};

const mutationFn = async ({ dto, slug }: MutationProps) => (await RecipesService.patchRecipe(slug, dto)).data;

const useUpdateRecipe = (config: UseMutationOptions<RecipeDto, unknown, MutationProps, unknown> = {}) =>
  useMutation({
    mutationFn,
    mutationKey: ['recipe', 'update'],
    ...config,
  });

export default useUpdateRecipe;
