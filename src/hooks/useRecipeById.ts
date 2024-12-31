import { QueryFunction, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { RecipeService } from '@/services';
import { RecipeDto } from '@/types';

type QueryKey = ['recipes', 'get-by-id', RecipeDto['id']];

const queryFn: QueryFunction<RecipeDto, QueryKey> = async ({ signal, queryKey }) => {
  const [, , id] = queryKey;

  return (await RecipeService.getRecipeById(id, { signal })).data;
};

const useRecipeById = (
  id: RecipeDto['id'],
  config: Omit<UseQueryOptions<RecipeDto, AxiosError, RecipeDto, QueryKey>, 'queryKey' | 'queryFn'> = {},
) =>
  useQuery({
    queryFn,
    queryKey: ['recipes', 'get-by-id', id],
    staleTime: 1000 * 60 * 10,
    ...config,
  });

export default useRecipeById;
