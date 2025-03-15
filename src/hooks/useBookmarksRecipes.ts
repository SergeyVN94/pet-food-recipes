import { QueryFunction, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { bookmarksService } from '@/services';
import { UserDto } from '@/types';
import { BookmarkRecipeEntity } from '@/types/bookmarks';

type QueryKey = ['bookmarks-recipes', UserDto['id']?];

const queryFn: QueryFunction<BookmarkRecipeEntity[], QueryKey> = async ({ signal, queryKey }) =>
  (await bookmarksService.getRecipesInBookmarks(queryKey[1], { signal })).data;

const useBookmarksRecipes = (
  userId?: string,
  config: Omit<UseQueryOptions<BookmarkRecipeEntity[], AxiosError, BookmarkRecipeEntity[], QueryKey>, 'queryKey' | 'queryFn'> = {},
) =>
  useQuery({
    queryFn,
    queryKey: ['bookmarks-recipes', userId],
    staleTime: 1000 * 60 * 10,
    ...config,
  });

export default useBookmarksRecipes;
