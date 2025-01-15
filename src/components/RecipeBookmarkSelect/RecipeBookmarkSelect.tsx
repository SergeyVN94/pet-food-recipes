'use client';

import React from 'react';

import { observer } from 'mobx-react-lite';

import { useBookmarksRecipes, useRemoveRecipeFromBookmark, useStore, userAddRecipeToBookmark } from '@/hooks';
import useBookmarks from '@/hooks/useBookmarks';
import { RecipeDto } from '@/types';
import { showToast } from '@/utils';

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
    if (recipeBookmarkRemoveError) {
      setBookmarkId(selectedBookmarkId ? selectedBookmarkId : null);
      showToast('error', 'Не удалось удалить рецепт из закладки');
    }
  }, [recipeBookmarkRemoveError, selectedBookmarkId]);

  React.useEffect(() => {
    if (recipeBookmarkRemove) {
      refetch();
      showToast('info', 'Рецепт удален из закладок');
    }
  }, [recipeBookmarkRemove, refetch]);

  React.useEffect(() => {
    if (recipeBookmarkError) {
      setBookmarkId(selectedBookmarkId ? selectedBookmarkId : null);
      showToast('error', 'Не удалось добавить рецепт в закладки');
    }
  }, [recipeBookmarkError, selectedBookmarkId]);

  React.useEffect(() => {
    if (recipeBookmark) {
      setBookmarkId(recipeBookmark.bookmarkId);
      refetch();
      showToast('info', 'Рецепт добавлен в закладки');
    }
  }, [recipeBookmark, refetch]);

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

const CheckAuthWrapper = observer((props: RecipeBookmarkSelectProps) => {
  const store = useStore();

  return store.authStore.isAuthenticated ? <RecipeBookmarkSelect {...props} /> : null;
});

export default CheckAuthWrapper;
