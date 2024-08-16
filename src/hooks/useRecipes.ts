import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import { RecipeService } from '@/services';
import { Recipe, RecipeFilter } from '@/types';

const useRecipes = (filter: RecipeFilter, config: UseQueryOptions<Recipe[], unknown, Recipe[], ['recipes', 'get', RecipeFilter]> = {}) =>
  useQuery({
    queryKey: ['recipes', 'get', filter],
    queryFn: async ({ queryKey, signal }) => {
      const [, , filter] = queryKey;
      const response = await RecipeService.postRecipesSearch(filter, { signal });

      return response.data as Recipe[];
    },
    initialData: [],
    ...config,
  });

export default useRecipes;
