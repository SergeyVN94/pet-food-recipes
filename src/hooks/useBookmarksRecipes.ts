import { QueryFunction, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { BookmarkService } from '@/services';
import { BookmarkRecipeDto } from '@/types/bookmarks';

type QueryKey = ['bookmarks-recipes'];

const queryFn: QueryFunction<BookmarkRecipeDto[], QueryKey> = async ({ signal }) =>
  (await BookmarkService.getRecipesInBookmarks({ signal })).data;

const useBookmarksRecipes = (
  config: Omit<UseQueryOptions<BookmarkRecipeDto[], AxiosError, BookmarkRecipeDto[], QueryKey>, 'queryKey' | 'queryFn'> = {},
) =>
  useQuery({
    queryFn,
    queryKey: ['bookmarks-recipes'],
    staleTime: 1000 * 60 * 10,
    ...config,
  });

export default useBookmarksRecipes;
