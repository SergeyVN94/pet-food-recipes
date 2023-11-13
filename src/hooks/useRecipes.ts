import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import { Recipe } from '@/types';

const useRecipes = (query: string, config: Omit<UseQueryOptions<Recipe[], unknown, Recipe[], string[]>, 'initialData'> = {}) =>
  useQuery({
    queryKey: ['recipe', 'get', query],
    queryFn: async ({ queryKey, signal }) => {
      const [, , _search] = queryKey;

      const response = await fetch(process.env.NEXT_PUBLIC_API_SERVER + `/api/v1/recipes${_search ? '?query=' + _search : ''}`, {
        signal,
      });

      return (await response.json()) as Recipe[];
    },
    initialData: [],
    ...config,
  });

export default useRecipes;
