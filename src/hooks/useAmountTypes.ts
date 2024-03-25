import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import { AmountType } from '@/types';
import { RecipeIngredientService } from '@/services';

const useAmountTypes = (config: UseQueryOptions<AmountType[] | null, Error, AmountType[]> = {}) =>
  useQuery({
    queryKey: ['amount-types', 'get'],
    queryFn: async ({ signal }) => {
      const response = await RecipeIngredientService.getAmountTypes({ signal });

      return response.data;
    },
    initialData: null,
    refetchOnWindowFocus: false,
    ...config,
  });

export default useAmountTypes;
