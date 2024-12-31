import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import { IngredientService } from '@/services';
import { IngredientDto } from '@/types';

const useIngredients = (
  config: Omit<UseQueryOptions<IngredientDto[] | null, Error, IngredientDto[] | null>, 'queryKey' | 'queryFn'> = {},
) =>
  useQuery({
    queryKey: ['recipe-ingredients', 'get'],
    queryFn: async ({ signal }) => {
      const response = await IngredientService.getIngredients({ signal });

      return response.data;
    },
    staleTime: 1000 * 60 * 10,
    ...config,
  });

export default useIngredients;
