import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Chip } from '@/components/ui';
import { Avatar } from '@/components/ui/Avatar';
import { IngredientDto, RecipeDto } from '@/types';

import { TimeSince } from '../TimeSince';

type RecipeCardProps = {
  recipe: RecipeDto;
  ingredientsMap: Map<number, IngredientDto>;
  isVisiblePriority?: boolean;
};

const RecipeCard = ({ recipe, ingredientsMap, isVisiblePriority = false }: RecipeCardProps) => {
  const firstImagePath = recipe.images?.[0];
  const imageUrl = firstImagePath ? `${process.env.NEXT_PUBLIC_STATIC_SERVER_URL}${firstImagePath}` : '/recipe-card-placeholder.png';

  return (
    <Link
      className="card-outlined w-full border-b border-neutral-90 group-last:border-none relative flex items-start gap-6 pointer hover:shadow-md transition-all rounded-md "
      href={`/recipe/${recipe.slug}`}
    >
      <Image
        alt="Фото рецепта"
        src={imageUrl}
        className="object-contain block size-64"
        width={256}
        height={256}
        loading={isVisiblePriority ? 'eager' : 'lazy'}
        placeholder="empty"
        priority={isVisiblePriority}
      />
      <div className="flex flex-col w-full self-stretch">
        <div className="flex items-center flex-nowrap mb-2 gap-4">
          <Link href={`/user/${recipe.user?.id}`} className="flex items-center gap-1 hover:underline cursor-pointer">
            {recipe.user && <Avatar user={recipe.user} size={32} />}
            <span className="title-m">{recipe.user?.userName}</span>
          </Link>
          <TimeSince startTime={recipe.createdAt} className="title-s" />
        </div>
        <h3 className="headline-m text-primary font-semibold line-clamp-2">{recipe.title}</h3>
        <p className="body-l mt-4 line-clamp-3 mb-2 text-pretty">{recipe.description}</p>
        <div className="flex flex-wrap items-center gap-2 mt-auto">
          {recipe.ingredients.map(ingredient => (
            <Chip label={ingredientsMap.get(ingredient.ingredientId)?.name ?? ''} key={ingredient.ingredientId} variant="outline" />
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
