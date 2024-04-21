import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import { RecipeIngredient } from '@/types';
import { RecipeIngredientService } from '@/services';

const useRecipeIngredients = (config: UseQueryOptions<RecipeIngredient[] | null, Error, RecipeIngredient[] | null> = {}) =>
  useQuery({
    queryKey: ['recipe-ingredients', 'get'],
    queryFn: async ({ signal }) => {
      const response = await RecipeIngredientService.getRecipeIngredients({ signal });

      return response.data;
    },
    initialData: null,
    refetchOnWindowFocus: false,
    ...config,
  });

export default useRecipeIngredients;
