'use client';

import React from 'react';

import { useParams } from 'next/navigation';

import { IconAdd } from '@/assets/icons';
import { RecipeCard } from '@/components';
import { ButtonLink } from '@/components/ui';
import { useIngredients, useRecipes, useUser } from '@/hooks';
import { RecipeFilter } from '@/types';

const EmptyRecipesListPlaceholder = () => (
  <li>
    <p className="text-lg">Вы пока не добавили рецептов</p>
    <ButtonLink href="/recipe/new" iconLeft={<IconAdd className="w-6 h-6" />} className="mt-4">
      Добавить рецепт
    </ButtonLink>
  </li>
);

const UserRecipesPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: selfUser } = useUser();
  const { data: user } = useUser(id);
  const filter = React.useMemo<RecipeFilter>(
    () => ({
      userId: user?.id,
    }),
    [user],
  );
  const { data: recipes, isFetching: isRecipesFetching } = useRecipes(filter, {
    enabled: Boolean(user),
  });
  const { data: ingredients, isFetching: isIngredientsFetching } = useIngredients();

  const ingredientsMap = React.useMemo(
    () => ingredients?.reduce((acc, ingredient) => acc.set(ingredient.id, ingredient), new Map()) ?? new Map(),
    [ingredients],
  );

  const recipesList = (recipes ?? [])?.map(recipe => (
    <li key={recipe.id} className="w-full">
      <RecipeCard recipe={recipe} ingredientsMap={ingredientsMap} />
    </li>
  ));

  return (
    <ul className="flex flex-col items-start w-full gap-3">
      {isRecipesFetching || isIngredientsFetching ? (
        <li className="skeleton h-[18.4375rem] rounded-xl" />
      ) : (
        <>
          {recipesList}
          {recipesList.length === 0 && selfUser?.id === user?.id && <EmptyRecipesListPlaceholder />}
          {recipesList.length === 0 && (!selfUser || selfUser?.id !== user?.id) && <p className="text-lg">Здесь нет рецептов</p>}
        </>
      )}
    </ul>
  );
};

export default UserRecipesPage;
