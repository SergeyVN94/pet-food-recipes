import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { RecipesService } from '@/services';
import { RecipeDto } from '@/types';

const mutationFn = async (slug: RecipeDto['slug']) => (await RecipesService.deleteRecipe(slug)).data;

const useDeleteRecipe = (config: UseMutationOptions<RecipeDto, unknown, RecipeDto['slug'], unknown> = {}) =>
  useMutation({
    mutationFn,
    mutationKey: ['recipe', 'delete'],
    ...config,
  });

export default useDeleteRecipe;
