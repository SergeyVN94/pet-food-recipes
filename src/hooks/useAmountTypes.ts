import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import { IngredientService } from '@/services';
import { AmountTypeDto } from '@/types';

const useAmountTypes = (config: Omit<UseQueryOptions<AmountTypeDto[] | null, Error, AmountTypeDto[]>, 'queryKey' | 'queryFn'> = {}) =>
  useQuery({
    queryKey: ['amount-types', 'get'],
    queryFn: async ({ signal }) => {
      const response = await IngredientService.getAmountTypes({ signal });

      return response.data;
    },
    refetchOnWindowFocus: false,
    ...config,
  });

export default useAmountTypes;
