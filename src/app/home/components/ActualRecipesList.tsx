'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import { Recipe } from '@/types';
import useRecipes from '@/hooks/useRecipes';

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const imageUrl =
    recipe.images && recipe.images.length > 0
      ? process.env.NEXT_PUBLIC_API_SERVER + '/public/recipes/' + recipe.images[0]
      : '/recipe-card-placeholder.png';

  return (
    <Link
      className="w-full border border-neutral-90 rounded-xl p-4 relative flex items-start gap-4 pointer"
      href={`/recipe/${recipe.slug}`}
    >
      <img alt={recipe.title} src={imageUrl} className="object-contain" width={256} height={256} />
      <div>
        <h3 className="title-l">{recipe.title}</h3>
        <p className="body-l mt-8">{recipe.description}</p>
      </div>
    </Link>
  );
};

const ActualRecipesList = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') ?? '';

  const { isFetching, data } = useRecipes(query, {
    refetchOnWindowFocus: false,
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
        data?.map((i) => (
          <li key={i.id} className="w-full">
            <RecipeCard recipe={i} />
          </li>
        ))
      )}
    </ul>
  );
};

export default ActualRecipesList;
