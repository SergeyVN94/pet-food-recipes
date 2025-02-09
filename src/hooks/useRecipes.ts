import { QueryFunction, UseQueryOptions, useQuery } from '@tanstack/react-query';

import { RecipesService } from '@/services';
import { RecipeDto, RecipeFilter } from '@/types';

const queryFn: QueryFunction<RecipeDto[], ['recipes', 'get', RecipeFilter]> = async ({ queryKey, signal }) => {
  const [, , filter] = queryKey;

  const response = await RecipesService.postRecipesSearch(filter, { signal });

  return response.data;
};

const useRecipes = (
  filter: RecipeFilter,
  config: Omit<UseQueryOptions<RecipeDto[], unknown, RecipeDto[], ['recipes', 'get', RecipeFilter]>, 'queryKey' | 'queryFn'> = {},
) =>
  useQuery({
    queryFn,
    queryKey: ['recipes', 'get', filter],
    ...config,
  });

export default useRecipes;
