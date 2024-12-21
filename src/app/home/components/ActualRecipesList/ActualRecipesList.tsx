'use client';

import React from 'react';

import { useSearchParams } from 'next/navigation';

import { useIngredients } from '@/hooks';
import useRecipes from '@/hooks/useRecipes';
import { IngredientDto, RecipeDto } from '@/types';

import { urlSearchParamsToFilter } from '../../lib';
import { RecipeCard } from '../RecipeCard';
import ActualRecipesListSkeleton from './ActualRecipesListSkeleton';

type ActualRecipesListProps = {
  initialRecipes: RecipeDto[];
  initialIngredients: IngredientDto[];
};

const ActualRecipesList = ({ initialRecipes = [], initialIngredients = [] }: ActualRecipesListProps) => {
  const searchParams = useSearchParams();
  const filter = React.useMemo(() => urlSearchParamsToFilter(searchParams), [searchParams]);

  const { data: recipes, isFetching: isRecipesFetching } = useRecipes(filter, {
    refetchOnMount: true,
    initialData: initialRecipes,
  });

  const { data: ingredients, isFetching: isIngredientsFetching } = useIngredients({
    refetchOnMount: true,
    initialData: initialIngredients,
    staleTime: 1000 * 60 * 3, // 3 minutes
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
      {recipes?.map(recipe => (
        <li key={recipe.id} className="w-full">
          <RecipeCard recipe={recipe} ingredientsMap={ingredientsMap} />
        </li>
      ))}
      {!isFetching && recipes?.length === 0 && filter.q && <li>{`По запросу «${filter.q}» ничего не найдено`}</li>}
    </ul>
  );
};

export default ActualRecipesList;
