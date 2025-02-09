import { QueryFunction, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { BookmarksService } from '@/services';
import { UserDto } from '@/types';
import { BookmarkDto } from '@/types/bookmarks';

type QueryKey = ['bookmarks', 'get-bookmarks', UserDto['id']?];

const queryFn: QueryFunction<BookmarkDto[], QueryKey> = async ({ signal, queryKey }) =>
  (await BookmarksService.getBookmarks(queryKey[2], { signal })).data;

const useBookmarks = (
  userId?: UserDto['id'],
  config: Omit<UseQueryOptions<BookmarkDto[], AxiosError, BookmarkDto[], QueryKey>, 'queryKey' | 'queryFn'> = {},
) =>
  useQuery({
    queryFn,
    queryKey: ['bookmarks', 'get-bookmarks', userId],
    staleTime: 1000 * 60 * 10,
    ...config,
  });

export default useBookmarks;
