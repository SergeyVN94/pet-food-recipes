import { UseMutationOptions, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { bookmarksService } from '@/services';
import { RecipeEntity } from '@/types';
import { BookmarkRecipeEntity } from '@/types/bookmarks';

type MutationVariables = {
  recipeId: RecipeEntity['id'];
};

const mutationFn = async ({ recipeId }: MutationVariables) => {
  return (await bookmarksService.removeRecipeFromBookmark(recipeId)).data;
};

const useRemoveRecipeFromBookmark = (
  config: UseMutationOptions<BookmarkRecipeEntity, AxiosError<{ message: string }>, MutationVariables> = {},
) =>
  useMutation<BookmarkRecipeEntity, AxiosError<{ message: string }>, MutationVariables>({
    mutationFn,
    mutationKey: ['bookmarks-recipes', 'remove-recipe'],
    ...config,
  });

export default useRemoveRecipeFromBookmark;
