import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import { RecipeService } from '@/services';
import { RecipeDto, RecipeFilter } from '@/types';

const useRecipes = (
  filter: RecipeFilter,
  config: Omit<UseQueryOptions<RecipeDto[], unknown, RecipeDto[], ['recipes', 'get', RecipeFilter]>, 'queryKey' | 'queryFn'> = {},
) =>
  useQuery({
    queryKey: ['recipes', 'get', filter],
    queryFn: async ({ queryKey, signal }) => {
      const [, , filter] = queryKey;
      const response = await RecipeService.postRecipesSearch(filter, { signal });

      return response.data;
    },
    initialData: [],
    ...config,
  });

export default useRecipes;
