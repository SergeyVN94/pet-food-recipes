import { QueryFunction, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { BookmarkService } from '@/services';
import { UserDto } from '@/types';
import { BookmarkRecipeDto } from '@/types/bookmarks';

type QueryKey = ['bookmarks-recipes', UserDto['id']?];

const queryFn: QueryFunction<BookmarkRecipeDto[], QueryKey> = async ({ signal, queryKey }) =>
  (await BookmarkService.getRecipesInBookmarks(queryKey[1], { signal })).data;

const useBookmarksRecipes = (
  userId?: string,
  config: Omit<UseQueryOptions<BookmarkRecipeDto[], AxiosError, BookmarkRecipeDto[], QueryKey>, 'queryKey' | 'queryFn'> = {},
) =>
  useQuery({
    queryFn,
    queryKey: ['bookmarks-recipes', userId],
    staleTime: 1000 * 60 * 10,
    ...config,
  });

export default useBookmarksRecipes;
