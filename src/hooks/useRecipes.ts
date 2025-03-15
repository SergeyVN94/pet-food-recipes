import { QueryFunction, UseQueryOptions, useQuery } from '@tanstack/react-query';

import { recipesService } from '@/services';
import { RecipeEntity, RecipeFilter } from '@/types';

const queryFn: QueryFunction<RecipeEntity[], ['recipes', 'get', RecipeFilter]> = async ({ queryKey, signal }) => {
  const [, , filter] = queryKey;

  const response = await recipesService.postRecipesSearch(filter, { signal });

  return response.data;
};

const useRecipes = (
  filter: RecipeFilter,
  config: Omit<UseQueryOptions<RecipeEntity[], unknown, RecipeEntity[], ['recipes', 'get', RecipeFilter]>, 'queryKey' | 'queryFn'> = {},
) =>
  useQuery({
    queryFn,
    queryKey: ['recipes', 'get', filter],
    ...config,
  });

export default useRecipes;
