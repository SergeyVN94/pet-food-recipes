'use client';

import React, { Suspense } from 'react';

import { useParams } from 'next/navigation';
import { parseAsStringEnum, useQueryState } from 'nuqs';

import { RecipeCard } from '@/components';
import { useBookmarks, useBookmarksRecipes, useIngredients, useRecipeById } from '@/hooks';
import { IngredientDto, RecipeEntity } from '@/types';
import { BookmarkDto } from '@/types/bookmarks';
import { arrayToDictionary } from '@/utils';

import { Menu } from '../components';

const RecipeCardWrapper = ({ recipeId, ingredientsMap }: { recipeId: RecipeEntity['id']; ingredientsMap: Map<number, IngredientDto> }) => {
  const { data: recipe, isFetching } = useRecipeById(recipeId);

  return isFetching ? (
    <div className="skeleton h-32" />
  ) : (
    recipe && (
      <RecipeCard
        recipe={recipe}
        ingredientsMap={ingredientsMap}
        key={recipe.id}
        isShowBookmark={false}
        isShowPublishedStatus
        className="w-full"
      />
    )
  );
};

const BookmarksPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: bookmarks, isFetching: isBookmarksFetching } = useBookmarks(id);
  const { data: bookmarksRecipes, isFetching: isBookmarksRecipesFetching } = useBookmarksRecipes(id);
  const { data: ingredients, isFetching: isIngredientsFetching } = useIngredients();
  const parser = React.useMemo(() => parseAsStringEnum((bookmarks ?? []).map(item => item.slug)), [bookmarks]);
  const [selectedBookmark, setSelectedBookmark] = useQueryState('bookmark', parser);

  const ingredientsMap = React.useMemo(
    () => ingredients?.reduce((acc, ingredient) => acc.set(ingredient.id, ingredient), new Map()) ?? new Map(),
    [ingredients],
  );

  const bookmarksRecipesMap = React.useMemo<Record<BookmarkDto['slug'], RecipeEntity['id'][]>>(() => {
    const bookmarksMapById = arrayToDictionary(bookmarks ?? [], 'id');

    const initialAcc =
      bookmarks?.reduce<Record<BookmarkDto['slug'], RecipeEntity['id'][]>>((acc, bookmark) => {
        acc[bookmark.slug] = [];

        return acc;
      }, {}) ?? {};

    return (bookmarksRecipes ?? []).reduce<Record<BookmarkDto['slug'], RecipeEntity['id'][]>>((acc, bookmarkRecipe) => {
      const slug = bookmarksMapById[bookmarkRecipe.bookmarkId]?.slug;

      if (!slug) {
        return acc;
      }

      if (!acc[slug]) {
        acc[slug] = [];
      }

      acc[slug].push(bookmarkRecipe.recipeId);

      return acc;
    }, initialAcc);
  }, [bookmarksRecipes, bookmarks]);

  const bookmarksMenuItems = React.useMemo(
    () => (bookmarks ?? []).map(bookmark => ({ id: bookmark.slug, title: bookmark.title })),
    [bookmarks],
  );

  React.useEffect(() => {
    if (bookmarks && bookmarks.length > 0 && !bookmarks.some(item => item.slug === selectedBookmark)) {
      setSelectedBookmark(bookmarks[0].slug);
    }
  }, [selectedBookmark, setSelectedBookmark, bookmarks]);

  const bookmarksMenu = isBookmarksFetching ? (
    <div className="skeleton w-60 h-96" />
  ) : (
    <Menu items={bookmarksMenuItems} onClick={setSelectedBookmark} selectedId={selectedBookmark ?? ''} />
  );

  const recipesList =
    isBookmarksRecipesFetching || isIngredientsFetching ? (
      <div className="skeleton w-full h-96" />
    ) : (
      <div className="flex flex-col items-start flex-nowrap gap-4 w-full">
        {bookmarksRecipesMap[selectedBookmark ?? '']?.map(recipeId => (
          <RecipeCardWrapper key={recipeId} recipeId={recipeId} ingredientsMap={ingredientsMap} />
        ))}
        {!bookmarksRecipesMap[selectedBookmark ?? ''] ||
          (bookmarksRecipesMap[selectedBookmark ?? '']?.length === 0 && <p className="body-l text-on-surf">Нет закладок</p>)}
      </div>
    );

  return (
    <section className="flex flex-nowrap gap-4">
      {bookmarksMenu}
      {recipesList}
    </section>
  );
};

const PageWrapper = () => (
  <Suspense fallback={<div className="skeleton w-full h-full min-h-[calc(100vh-8rem)]" />}>
    <BookmarksPage />
  </Suspense>
);

export default PageWrapper;
