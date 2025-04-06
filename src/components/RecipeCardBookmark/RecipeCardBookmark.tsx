'use client';

import React from 'react';

import dynamic from 'next/dynamic';

import { useBookmarks, useBookmarksRecipes } from '@/hooks';
import { RecipeEntity } from '@/types';
import { cn } from '@/utils';

import { Chip } from '../ui';

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

  return bookmark && <Chip label={bookmark.title} className={cn('max-w-[70%]', className)} tooltip={bookmark.title} />;
};

export default dynamic(() => Promise.resolve(RecipeCardBookmark), { ssr: false });
