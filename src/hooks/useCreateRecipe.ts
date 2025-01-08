import { UseMutationOptions, useMutation } from '@tanstack/react-query';

import { RecipeService } from '@/services';
import { RecipeCreateDto, RecipeDto } from '@/types';

const mutationFn = async (dto: RecipeCreateDto) => (await RecipeService.postRecipe(dto)).data;

const useCreateRecipe = (config: UseMutationOptions<RecipeDto, unknown, RecipeCreateDto, unknown> = {}) =>
  useMutation({
    mutationFn,
    mutationKey: ['recipe', 'post'],
    ...config,
  });

export default useCreateRecipe;
