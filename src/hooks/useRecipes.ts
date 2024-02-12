import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import { Recipe } from '@/types';
import { RecipeService } from '@/services';

const useRecipes = (query: string, config: UseQueryOptions<Recipe[], unknown, Recipe[], string[]> = {}) =>
  useQuery({
    queryKey: ['recipe', 'get', query],
    queryFn: async ({ queryKey, signal }) => {
      const [, , search] = queryKey;
      const response = await RecipeService.getRecipes(search, { signal });

      return response.data as Recipe[];
    },
    initialData: [],
    ...config,
  });

export default useRecipes;
