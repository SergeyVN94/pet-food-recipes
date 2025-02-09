import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { BookmarksService } from '@/services';
import { BookmarkRecipeDto } from '@/types/bookmarks';

type MutationVariables = {
  bookmarkId: string;
  recipeId: string;
};

const mutationFn = async ({ bookmarkId, recipeId }: MutationVariables) =>
  (await BookmarksService.addRecipeToBookmark(recipeId, bookmarkId)).data;

const useAddRecipeToBookmark = (config: UseMutationOptions<BookmarkRecipeDto, AxiosError<{ message: string }>, MutationVariables> = {}) =>
  useMutation<BookmarkRecipeDto, AxiosError<{ message: string }>, MutationVariables>({
    mutationFn,
    mutationKey: ['bookmarks-recipes', 'add-recipe'],
    ...config,
  });

export default useAddRecipeToBookmark;
