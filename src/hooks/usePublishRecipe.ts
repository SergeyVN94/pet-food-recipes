import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { RecipesService } from '@/services';
import { RecipeEntity } from '@/types';

const mutationFn = async (slug: string) => (await RecipesService.publishRecipe(slug)).data;

const usePublishRecipe = (config: UseMutationOptions<RecipeEntity, AxiosError, string> = {}) =>
  useMutation({
    mutationFn,
    mutationKey: ['recipe', 'publish'],
    ...config,
  });

export default usePublishRecipe;
