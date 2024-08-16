'use client';

import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import useRecipes from '@/hooks/useRecipes';
import { Recipe } from '@/types';

import { urlSearchParamsToFilter } from '../../lib';

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const firstImagePath = recipe.images?.[0];
  const imageUrl = firstImagePath ? `${process.env.NEXT_STATIC_SERVER_URL}${firstImagePath}` : '/recipe-card-placeholder.png';

  return (
    <Link
      className="w-full border-b border-neutral-90 group-last:border-none p-4 pl-0 relative flex items-start gap-4 pointer"
      href={`/recipe/${recipe.slug}`}
    >
      <Image alt={recipe.title} src={imageUrl} className="object-contain" width={256} height={256} />
      <div>
        <h3 className="title-l">{recipe.title}</h3>
        <p className="body-l mt-8">{recipe.description}</p>
      </div>
    </Link>
  );
};

type ActualRecipesListProps = {
  initialRecipes?: Recipe[];
};

const ActualRecipesList = ({ initialRecipes = [] }: ActualRecipesListProps) => {
  const searchParams = useSearchParams();
  const filter = React.useMemo(() => urlSearchParamsToFilter(searchParams), [searchParams]);

  const { data, isFetching } = useRecipes(filter, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    initialData: initialRecipes,
  });

  return (
    <ul className="flex flex-col items-start flex-nowrap gap-4 pt-8 w-full">
      {isFetching ? (
        <>
          <div className="skeleton h-[18.4375rem] rounded-xl" />
          <div className="skeleton h-[18.4375rem] rounded-xl" />
          <div className="skeleton h-[18.4375rem] rounded-xl" />
        </>
      ) : (
        data?.map(i => (
          <li key={i.id} className="w-full">
            <RecipeCard recipe={i} />
          </li>
        ))
      )}
      {!isFetching && data?.length === 0 && filter.q && <li>{`По запросу «${filter.q}» ничего не найдено`}</li>}
    </ul>
  );
};

export default ActualRecipesList;
