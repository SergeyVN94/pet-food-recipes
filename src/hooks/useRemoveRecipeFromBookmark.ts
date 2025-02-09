import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { BookmarksService } from '@/services';
import { RecipeDto } from '@/types';
import { BookmarkRecipeDto } from '@/types/bookmarks';

type MutationVariables = {
  recipeId: RecipeDto['id'];
};

const mutationFn = async ({ recipeId }: MutationVariables) => {
  return (await BookmarksService.removeRecipeFromBookmark(recipeId)).data;
};

const useRemoveRecipeFromBookmark = (
  config: UseMutationOptions<BookmarkRecipeDto, AxiosError<{ message: string }>, MutationVariables> = {},
) =>
  useMutation<BookmarkRecipeDto, AxiosError<{ message: string }>, MutationVariables>({
    mutationFn,
    mutationKey: ['bookmarks-recipes', 'remove-recipe'],
    ...config,
  });

export default useRemoveRecipeFromBookmark;
