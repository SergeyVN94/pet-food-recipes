import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { RecipesService } from '@/services';
import { RecipeCreateDto, RecipeDto } from '@/types';

const mutationFn = async (dto: RecipeCreateDto) => (await RecipesService.postRecipe(dto)).data;

const useCreateRecipe = (config: UseMutationOptions<RecipeDto, unknown, RecipeCreateDto, unknown> = {}) =>
  useMutation({
    mutationFn,
    mutationKey: ['recipe', 'create'],
    ...config,
  });

export default useCreateRecipe;
