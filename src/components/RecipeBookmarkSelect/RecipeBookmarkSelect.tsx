'use client';

import React from 'react';

import { useBookmarksRecipes, useRemoveRecipeFromBookmark, userAddRecipeToBookmark } from '@/hooks';
import useBookmarks from '@/hooks/useBookmarks';
import { RecipeDto } from '@/types';

import { Select, SelectItem } from '../ui';

type RecipeBookmarkSelectProps = {
  recipeId: RecipeDto['id'];
  className?: string;
};

const RecipeBookmarkSelect = ({ className, recipeId }: RecipeBookmarkSelectProps) => {
  const [bookmarkId, setBookmarkId] = React.useState<string | null>(null);
  const { data: bookmarks, isFetching: isBookmarksFetching } = useBookmarks();
  const { data: bookmarksRecipes, isFetching: isBookmarksRecipesFetching, refetch } = useBookmarksRecipes();
  const { mutateAsync: addRecipeToBookmark, data: recipeBookmark, error: recipeBookmarkError } = userAddRecipeToBookmark();
  const {
    mutateAsync: removeRecipeFromBookmark,
    data: recipeBookmarkRemove,
    error: recipeBookmarkRemoveError,
  } = useRemoveRecipeFromBookmark();
  const selectedBookmarkId = React.useMemo(
    () => bookmarksRecipes?.find(bookmarkRecipe => bookmarkRecipe.recipeId === recipeId)?.bookmarkId,
    [bookmarksRecipes, recipeId],
  );
  const selectItems: SelectItem[] = bookmarks?.map(bookmark => ({ id: bookmark.id, label: bookmark.title })) ?? [];
  const isSomeLoading = isBookmarksFetching || isBookmarksRecipesFetching;

  const handleBookmarkChange = (bookmarkId: string) => {
    addRecipeToBookmark({ recipeId, bookmarkId });
    setBookmarkId(bookmarkId);
  };

  const handleBookmarkClear = () => {
    removeRecipeFromBookmark({ recipeId });
    setBookmarkId(null);
  };

  React.useEffect(() => {
    if (recipeBookmarkRemove) {
      refetch();
    }
  }, [recipeBookmarkRemove]);

  React.useEffect(() => {
    if (recipeBookmarkError) {
      setBookmarkId(selectedBookmarkId ? selectedBookmarkId : null);
    }
  }, [recipeBookmarkError, selectedBookmarkId]);

  React.useEffect(() => {
    if (recipeBookmarkError) {
      setBookmarkId(null);
    }
  }, [recipeBookmarkError]);

  React.useEffect(() => {
    if (recipeBookmark) {
      setBookmarkId(recipeBookmark.bookmarkId);
      refetch();
    }
  }, [recipeBookmark]);

  React.useEffect(() => {
    setBookmarkId(selectedBookmarkId ? selectedBookmarkId : null);
  }, [selectedBookmarkId]);

  const select = bookmarks && (
    <Select
      items={selectItems}
      name="bookmark"
      onChange={handleBookmarkChange}
      value={bookmarkId}
      label="Добавить в закладки"
      onClear={handleBookmarkClear}
      className="min-w-72"
    />
  );

  return <div className={className}>{isSomeLoading ? <div className="skeleton w-32 h-8" /> : select}</div>;
};

export default RecipeBookmarkSelect;
