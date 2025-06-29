import { QueryFunction, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { recipesService } from '@/services';
import { RecipeImageDto } from '@/types';

const queryFn: QueryFunction<RecipeImageDto[]> = async ({ signal }) => (await recipesService.getNewImages({ signal })).data;

const useNewRecipeImages = (config: Omit<UseQueryOptions<RecipeImageDto[], AxiosError, RecipeImageDto[]>, 'queryKey' | 'queryFn'> = {}) =>
  useQuery({
    queryFn,
    queryKey: ['recipes', 'image', 'get-all'],
    ...config,
  });

export default useNewRecipeImages;
