import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { IngredientDto, RecipeEntity } from '@/types';
import { Chip } from '@/ui';
import { Avatar } from '@/ui/Avatar';
import { cn } from '@/utils';

import { RecipeCardBookmark } from '../RecipeCardBookmark';
import { TimeSince } from '../TimeSince';

type RecipeCardProps = {
  recipe: RecipeEntity;
  ingredientsMap: Map<number, IngredientDto>;
  isVisiblePriority?: boolean;
  isShowBookmark?: boolean;
  isShowPublishedStatus?: boolean;
  className?: string;
};

const RecipeCard = ({
  recipe,
  ingredientsMap,
  isVisiblePriority = false,
  isShowBookmark = true,
  isShowPublishedStatus = true,
  className,
}: RecipeCardProps) => {
  const firstImagePath = recipe.images?.[0];
  const imageUrl = firstImagePath ? `${process.env.NEXT_PUBLIC_STATIC_SERVER_URL}${firstImagePath}` : '/recipe-card-placeholder.png';

  return (
    <div
      className={cn(
        'card-outlined border-b border-neutral-90 group-last:border-none relative pointer hover:shadow-md transition-all rounded-md flex flex-col md:items-start md:pl-72 md:min-h-80',
        className,
      )}
    >
      <div className="flex items-center flex-nowrap mb-2 gap-4">
        <Link href={`/user/${recipe.user?.id}`} className="flex items-center gap-1 hover:underline cursor-pointer relative z-20">
          {recipe.user && <Avatar user={recipe.user} size={32} />}
          <span className="title-m">{recipe.user?.userName}</span>
        </Link>
        <TimeSince startTime={recipe.createdAt} className="title-s" />
      </div>
      <div className="flex flex-nowrap items-center gap-2">
        <Link
          className="block headline-m text-primary font-semibold line-clamp-2 before:content-[''] before:block before:absolute before:left-0 before:top-0 before:size-full"
          href={`/recipe/${recipe.slug}`}
        >
          {recipe.title}
        </Link>
        {isShowPublishedStatus && !recipe.isPublished && (
          <Chip label="На модерации" variant="filled" color="error" tooltip="Рецепт проверяется модератором" />
        )}
      </div>
      <div className="relative w-full h-64 md:absolute md:top-4 md:left-4 md:w-64">
        <Image
          alt="Фото рецепта"
          src={imageUrl}
          className="object-cover block absolute left-0 top-0 size-full"
          width={512}
          height={512}
          loading={isVisiblePriority ? 'eager' : 'lazy'}
          placeholder="empty"
          priority={isVisiblePriority}
        />
        {isShowBookmark && <RecipeCardBookmark recipeId={recipe.id} className="absolute top-2 right-2" />}
      </div>

      <p className="body-l mt-4 line-clamp-3 mb-2 text-pretty">{recipe.description}</p>
      <div className="flex flex-wrap items-center gap-2 mt-2 md:mt-auto">
        {recipe.ingredients.map(ingredient => (
          <Chip label={ingredientsMap.get(ingredient.ingredientId)?.name ?? ''} key={ingredient.ingredientId} variant="outline" />
        ))}
      </div>
    </div>
  );
};

export default RecipeCard;
