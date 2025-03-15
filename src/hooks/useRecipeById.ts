import { QueryFunction, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { recipesService } from '@/services';
import { RecipeEntity } from '@/types';

type QueryKey = ['recipes', 'get-by-id', RecipeEntity['id']];

const queryFn: QueryFunction<RecipeEntity, QueryKey> = async ({ signal, queryKey }) => {
  const [, , id] = queryKey;

  return (await recipesService.getRecipeById(id, { signal })).data;
};

const useRecipeById = (
  id: RecipeEntity['id'],
  config: Omit<UseQueryOptions<RecipeEntity, AxiosError, RecipeEntity, QueryKey>, 'queryKey' | 'queryFn'> = {},
) =>
  useQuery({
    queryFn,
    queryKey: ['recipes', 'get-by-id', id],
    staleTime: 1000 * 60 * 10,
    ...config,
  });

export default useRecipeById;
