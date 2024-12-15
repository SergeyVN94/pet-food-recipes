import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { IconSchedule } from '@/assets/icons';
import { Chip } from '@/components/ui';
import { Avatar } from '@/components/ui/Avatar';
import { RecipeDto } from '@/types';
import { getTimeSince } from '@/utils';

type RecipeCardProps = {
  recipe: RecipeDto;
};

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const firstImagePath = recipe.images?.[0];
  const imageUrl = firstImagePath ? `${process.env.NEXT_STATIC_SERVER_URL}${firstImagePath}` : '/recipe-card-placeholder.png';

  return (
    <Link
      className="w-full border-b border-neutral-90 group-last:border-none p-4 pl-0 relative flex items-start gap-6 pointer hover:shadow-md transition-all rounded-md"
      href={`/recipe/${recipe.slug}`}
    >
      <Image alt={recipe.title} src={imageUrl} className="object-contain" width={256} height={256} />
      <div className="flex flex-col w-full self-stretch">
        <div className="flex items-center flex-nowrap mb-2 gap-4">
          <p className="flex items-center gap-1">
            {recipe.user && <Avatar user={recipe.user} className="size-8" />}
            <span className="title-m">{recipe.user?.userName}</span>
          </p>
          <p className="title-s flex flex-nowrap items-center gap-1">
            <IconSchedule className="size-5" />
            <span>{getTimeSince(recipe.createdAt)}</span>
          </p>
        </div>
        <h3 className="headline-m text-primary font-semibold line-clamp-2">{recipe.title}</h3>
        <p className="body-l mt-4 line-clamp-3 mb-2">{recipe.description}</p>
        <div className="flex flex-wrap items-center gap-2 mt-auto">
          {recipe.ingredients.map(ingredientUnit => (
            <Chip label={ingredientUnit.ingredient?.name} key={ingredientUnit.id} variant="outline" />
          ))}
        </div>
        <p className="flex flex-nowrap items-center gap-2 title-s mt-4">
          <span>
            Шагов: <span className="text-primary">{recipe.steps.length}</span>
          </span>
          <span>
            Ингредиентов: <span className="text-primary">{recipe.ingredients.length}</span>
          </span>
        </p>
      </div>
    </Link>
  );
};

export default RecipeCard;
