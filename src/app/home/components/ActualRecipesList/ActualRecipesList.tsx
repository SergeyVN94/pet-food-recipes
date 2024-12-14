'use client';

import React from 'react';

import { useSearchParams } from 'next/navigation';

import useRecipes from '@/hooks/useRecipes';
import { RecipeDto } from '@/types';

import { urlSearchParamsToFilter } from '../../lib';
import { RecipeCard } from '../RecipeCard';

type ActualRecipesListProps = {
  initialRecipes?: RecipeDto[];
};

const ActualRecipesList = ({ initialRecipes = [] }: ActualRecipesListProps) => {
  const searchParams = useSearchParams();
  const filter = React.useMemo(() => urlSearchParamsToFilter(searchParams), [searchParams]);

  const { data: recipes, isFetching } = useRecipes(filter, {
    refetchOnMount: false,
    initialData: initialRecipes,
  });

  return (
    <ul className="flex flex-col items-start flex-nowrap gap-4 pt-8 w-full">
      {isFetching ? (
        <>
          <li className="skeleton h-[18.4375rem] rounded-xl" />
          <li className="skeleton h-[18.4375rem] rounded-xl" />
          <li className="skeleton h-[18.4375rem] rounded-xl" />
        </>
      ) : (
        recipes?.map(recipe => (
          <li key={recipe.id} className="w-full">
            <RecipeCard recipe={recipe} />
          </li>
        ))
      )}
      {!isFetching && recipes?.length === 0 && filter.q && <li>{`По запросу «${filter.q}» ничего не найдено`}</li>}
    </ul>
  );
};

export default ActualRecipesList;
