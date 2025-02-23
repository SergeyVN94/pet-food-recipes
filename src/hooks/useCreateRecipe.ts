import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { RecipesService } from '@/services';
import { RecipeCreateDto, RecipeEntity } from '@/types';

const mutationFn = async (dto: RecipeCreateDto) => (await RecipesService.postRecipe(dto)).data;

const useCreateRecipe = (config: UseMutationOptions<RecipeEntity, unknown, RecipeCreateDto, unknown> = {}) =>
  useMutation({
    mutationFn,
    mutationKey: ['recipe', 'create'],
    ...config,
  });

export default useCreateRecipe;
