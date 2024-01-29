import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { Recipe, RecipeDto } from '@/types';
import { RecipeService } from '@/services';

const mutationFn = async (dto: RecipeDto) => {
  const response = await RecipeService.postRecipe(dto);

  return response.data as Recipe;
};

const useMakeRecipe = (config: UseMutationOptions<Recipe, unknown, RecipeDto, unknown> = {}) =>
  useMutation({
    mutationFn,
    mutationKey: ['recipe', 'post'],
    ...config,
  });

export default useMakeRecipe;
