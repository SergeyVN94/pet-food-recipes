import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { recipesService } from '@/services';
import { RecipeEntity } from '@/types';

const mutationFn = async (slug: RecipeEntity['slug']) => (await recipesService.deleteRecipe(slug)).data;

const useDeleteRecipe = (config: UseMutationOptions<RecipeEntity, unknown, RecipeEntity['slug'], unknown> = {}) =>
  useMutation({
    mutationFn,
    mutationKey: ['recipe', 'delete'],
    ...config,
  });

export default useDeleteRecipe;
