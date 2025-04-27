import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { RecipeEntity } from '@/types';
import { Avatar } from '@/ui';

import { TimeSince } from '../TimeSince';

type SmallRecipeCardProps = {
  recipe: RecipeEntity;
  isVisiblePriority?: boolean;
};

const SmallRecipeCard = ({ recipe, isVisiblePriority = false }: SmallRecipeCardProps) => {
  const firstImagePath = recipe.images?.[0];
  const imageUrl = firstImagePath ? `${process.env.NEXT_PUBLIC_STATIC_SERVER_URL}${firstImagePath}` : '/recipe-card-placeholder.png';

  return (
    <div className="card-outlined w-full border-b border-neutral-90 group-last:border-none relative flex items-start gap-6 pointer hover:shadow-md transition-all rounded-md">
      <Image
        alt="Фото рецепта"
        src={imageUrl}
        className="object-contain block size-16"
        width={64}
        height={64}
        loading={isVisiblePriority ? 'eager' : 'lazy'}
        placeholder="empty"
        priority={isVisiblePriority}
      />
      <div>
        <div className="flex items-center flex-nowrap mb-2 gap-4">
          <Link href={`/user/${recipe.user?.id}`} className="flex items-center gap-1 hover:underline cursor-pointer relative z-20">
            {recipe.user && <Avatar user={recipe.user} size={32} />}
            <span className="title-m">{recipe.user?.userName}</span>
          </Link>
          <TimeSince startTime={recipe.createdAt} className="title-s" />
          {!recipe.isPublished && <p className="bg-error-container text-error px-2 py-1 rounded label-l ml-2">На модерации</p>}
        </div>
        <Link
          className="headline-m text-primary font-semibold line-clamp-2 before:content-[''] before:block before:absolute before:left-0 before:top-0 before:size-full"
          href={`/recipe/${recipe.slug}`}
        >
          {recipe.title}
        </Link>
      </div>
      <div></div>
    </div>
  );
};

export default SmallRecipeCard;
