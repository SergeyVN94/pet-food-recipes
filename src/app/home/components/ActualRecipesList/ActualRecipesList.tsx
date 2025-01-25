'use client';

import React from 'react';

import { observer } from 'mobx-react-lite';

import { useIngredients, useRecipeFilter, useRecipes } from '@/hooks';
import { IngredientDto, RecipeDto } from '@/types';

import { RecipeCard } from '../../../../components/RecipeCard';
import ActualRecipesListSkeleton from './ActualRecipesListSkeleton';

type ActualRecipesListProps = {
  initialRecipes?: RecipeDto[];
  initialIngredients?: IngredientDto[];
};

const ActualRecipesList = observer(({ initialRecipes = [], initialIngredients = [] }: ActualRecipesListProps) => {
  const filter = useRecipeFilter();

  const { data: recipes, isFetching: isRecipesFetching } = useRecipes(filter, {
    refetchOnMount: true,
    initialData: initialRecipes,
  });

  const { data: ingredients, isFetching: isIngredientsFetching } = useIngredients({
    initialData: initialIngredients,
    staleTime: Infinity,
  });

  const ingredientsMap = React.useMemo(
    () => ingredients?.reduce((acc, ingredient) => acc.set(ingredient.id, ingredient), new Map()) ?? new Map(),
    [ingredients],
  );

  const isFetching = isRecipesFetching || isIngredientsFetching;

  return isFetching ? (
    <ActualRecipesListSkeleton />
  ) : (
    <ul className="flex flex-col items-start flex-nowrap gap-4 pt-8 w-full">
      {recipes?.map((recipe, index) => (
        <li key={recipe.id} className="w-full">
          <RecipeCard recipe={recipe} ingredientsMap={ingredientsMap} isVisiblePriority={index < 20} />
        </li>
      ))}
      {!isFetching && recipes?.length === 0 && filter.q && <li>{`По запросу «${filter.q}» ничего не найдено`}</li>}
    </ul>
  );
});

export default ActualRecipesList;
