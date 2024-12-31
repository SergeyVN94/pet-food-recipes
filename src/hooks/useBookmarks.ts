import { QueryFunction, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { BookmarkService } from '@/services';
import { BookmarkDto } from '@/types/bookmarks';

type QueryKey = ['bookmarks', 'get-bookmarks'];

const queryFn: QueryFunction<BookmarkDto[], QueryKey> = async ({ signal }) => (await BookmarkService.getBookmarks({ signal })).data;

const useBookmarks = (config: Omit<UseQueryOptions<BookmarkDto[], AxiosError, BookmarkDto[], QueryKey>, 'queryKey' | 'queryFn'> = {}) =>
  useQuery({
    queryFn,
    queryKey: ['bookmarks', 'get-bookmarks'],
    staleTime: 1000 * 60 * 10,
    ...config,
  });

export default useBookmarks;
