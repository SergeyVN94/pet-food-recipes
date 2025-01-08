import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { BookmarkService } from '@/services';
import { BookmarkDto } from '@/types/bookmarks';

type MutationVariables = {
  bookmarkId: string;
  title: string;
};

const mutationFn = async ({ bookmarkId, title }: MutationVariables) => (await BookmarkService.updateBookmark(bookmarkId, { title })).data;

const useUpdateBookmark = (config: UseMutationOptions<BookmarkDto, AxiosError<{ message: string }>, MutationVariables> = {}) =>
  useMutation<BookmarkDto, AxiosError<{ message: string }>, MutationVariables>({
    mutationFn,
    mutationKey: ['bookmarks', 'update'],
    ...config,
  });

export default useUpdateBookmark;
