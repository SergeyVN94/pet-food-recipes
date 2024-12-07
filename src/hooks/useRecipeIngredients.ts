import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import { RecipeIngredientService } from '@/services';
import { RecipeIngredientDto } from '@/types';

const useRecipeIngredients = (
  config: Omit<UseQueryOptions<RecipeIngredientDto[] | null, Error, RecipeIngredientDto[] | null>, 'queryKey' | 'queryFn'> = {},
) =>
  useQuery({
    queryKey: ['recipe-ingredients', 'get'],
    queryFn: async ({ signal }) => {
      const response = await RecipeIngredientService.getRecipeIngredients({ signal });

      return response.data;
    },
    refetchOnWindowFocus: false,
    ...config,
  });

export default useRecipeIngredients;
