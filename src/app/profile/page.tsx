'use client';

import React from 'react';

import { IconAdd } from '@/assets/icons';
import { RecipeCard } from '@/components';
import { Button } from '@/components/ui';
import { useIngredients, useRecipes, useUser } from '@/hooks';
import { RecipeFilter } from '@/types';

const EmptyRecipesListPlaceholder = () => (
  <li>
    <p className="text-lg">Вы пока не добавили рецептов</p>
    <Button iconLeft={<IconAdd className="w-6 h-6" />} className="mt-4">
      Добавить рецепт
    </Button>
  </li>
);

const ProfilePage = () => {
  const { data: user } = useUser();
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

  const recipesList =
    recipes &&
    recipes.length > 0 &&
    recipes.map(recipe => (
      <li key={recipe.id} className="w-full">
        <RecipeCard recipe={recipe} ingredientsMap={ingredientsMap} />
      </li>
    ));

  return (
    <ul className="flex flex-col items-start w-full gap-3">
      {isRecipesFetching || isIngredientsFetching ? (
        <li className="skeleton h-[18.4375rem] rounded-xl" />
      ) : (
        recipesList || <EmptyRecipesListPlaceholder />
      )}
    </ul>
  );
};

export default ProfilePage;
