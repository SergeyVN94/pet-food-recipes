'use client';

import React from 'react';

import dynamic from 'next/dynamic';

import { useBookmarks, useBookmarksRecipes } from '@/hooks';
import { RecipeEntity } from '@/types';
import { cn } from '@/utils';

type RecipeCardBookmarkProps = {
  recipeId: RecipeEntity['id'];
  className?: string;
};

const RecipeCardBookmark = ({ recipeId, className }: RecipeCardBookmarkProps) => {
  const { data: bookmarks } = useBookmarks();
  const { data: bookmarksRecipes } = useBookmarksRecipes();

  const bookmark = React.useMemo(() => {
    const bookmarkId = bookmarksRecipes?.find(bookmarkRecipe => bookmarkRecipe.recipeId === recipeId)?.bookmarkId;

    return bookmarks?.find(bookmark => bookmark.id === bookmarkId);
  }, [bookmarksRecipes, bookmarks, recipeId]);

  return bookmark && <p className={cn('label-l text-on-primary-fixed bg-primary-fixed rounded px-2 py-1', className)}>{bookmark.title}</p>;
};

export default dynamic(() => Promise.resolve(RecipeCardBookmark), { ssr: false });
