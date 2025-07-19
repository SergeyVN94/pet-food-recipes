import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { bookmarksService } from '@/services';
import { BookmarkDto } from '@/types/bookmarks';

type MutationVariables = {
  title: string;
};

const mutationFn = async ({ title }: MutationVariables) => (await bookmarksService.createBookmark({ title })).data;

const useCreateBookmark = (config: UseMutationOptions<BookmarkDto, AxiosError<{ message: string }>, MutationVariables> = {}) =>
  useMutation<BookmarkDto, AxiosError<{ message: string }>, MutationVariables>({
    mutationFn,
    mutationKey: ['bookmarks', 'create'],
    ...config,
  });

export default useCreateBookmark;
