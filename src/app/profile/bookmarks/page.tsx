'use client';

import React from 'react';

import { parseAsStringEnum, useQueryState } from 'nuqs';

import { RecipeCard } from '@/components';
import { useBookmarksRecipes, useIngredients, useRecipeById } from '@/hooks';
import useBookmarks from '@/hooks/useBookmarks';
import { IngredientDto, RecipeDto } from '@/types';
import { BookmarkDto } from '@/types/bookmarks';
import { arrayToDictionary } from '@/utils';

const RecipeCardWrapper = ({ recipeId, ingredientsMap }: { recipeId: RecipeDto['id']; ingredientsMap: Map<number, IngredientDto> }) => {
  const { data: recipe, isFetching } = useRecipeById(recipeId);

  return isFetching ? (
    <div className="skeleton h-32" />
  ) : (
    recipe && <RecipeCard recipe={recipe} ingredientsMap={ingredientsMap} key={recipe.id} />
  );
};

type BookmarksMenuProps = {
  bookmarks: BookmarkDto[];
  onClick: (slug: string) => void;
  selected: string;
};

const BookmarksMenu = ({ bookmarks, onClick, selected }: BookmarksMenuProps) => (
  <div className="w-72 rounded-xl overflow-hidden">
    {bookmarks?.map(bookmark => (
      <div
        className="bg-surf-cont-low hover:bg-surf-cont-high transition-colors w-full data-[selected='true']:bg-surf-cont-highest"
        data-selected={selected === bookmark.slug}
      >
        <button
          className="py-2 px-4 max-w-full outline-none border-none body-l cursor-pointer text-left line-clamp-2 text-on-surface w-full "
          onClick={() => onClick(bookmark.slug)}
        >
          {bookmark.title}
        </button>
      </div>
    ))}
  </div>
);

const BookmarksPage = () => {
  const { data: bookmarks, isFetching: isBookmarksFetching } = useBookmarks();
  const parser = React.useMemo(() => parseAsStringEnum((bookmarks ?? []).map(item => item.slug)), [bookmarks]);
  const [selectedBookmark, setSelectedBookmark] = useQueryState('bookmark', parser);
  const { data: bookmarksRecipes, isFetching: isBookmarksRecipesFetching } = useBookmarksRecipes();
  const { data: ingredients, isFetching: isIngredientsFetching } = useIngredients();

  const ingredientsMap = React.useMemo(
    () => ingredients?.reduce((acc, ingredient) => acc.set(ingredient.id, ingredient), new Map()) ?? new Map(),
    [ingredients],
  );

  const bookmarksRecipesMap = React.useMemo(() => {
    const bookmarksMapById = arrayToDictionary(bookmarks ?? [], 'id');

    const initialAcc =
      bookmarks?.reduce<Record<BookmarkDto['slug'], RecipeDto['id'][]>>((acc, bookmark) => {
        acc[bookmark.slug] = [];

        return acc;
      }, {}) ?? {};

    return (bookmarksRecipes ?? []).reduce<Record<BookmarkDto['slug'], RecipeDto['id'][]>>((acc, bookmarkRecipe) => {
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

  React.useEffect(() => {
    if (bookmarks && bookmarks.length > 0 && !bookmarks.some(item => item.slug === selectedBookmark)) {
      setSelectedBookmark(bookmarks[0].slug);
    }
  }, [selectedBookmark, setSelectedBookmark, bookmarks]);

  const bookmarksMenu = isBookmarksFetching ? (
    <div className="skeleton w-60 h-96" />
  ) : (
    <BookmarksMenu bookmarks={bookmarks ?? []} onClick={setSelectedBookmark} selected={selectedBookmark ?? ''} />
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
          (bookmarksRecipesMap[selectedBookmark ?? '']?.length === 0 && <p className="body-l text-on-surface">Нет закладок</p>)}
      </div>
    );

  return (
    <section className="flex flex-nowrap gap-4">
      {bookmarksMenu}
      {recipesList}
    </section>
  );
};

export default BookmarksPage;
