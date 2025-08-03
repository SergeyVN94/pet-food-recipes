'use client';

import React from 'react';

import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import { IconClose } from '@/assets/icons';
import { RecipeImageDto } from '@/types';
import { ButtonIcon } from '@/ui';
import { cn, getRecipeImageUrl } from '@/utils';

import './styles.css';

type ImagesGalleryProps = Omit<
  React.ComponentProps<typeof ImageGallery>,
  'items' | 'lazyLoad' | 'infinite' | 'showThumbnails' | 'showPlayButton'
> & {
  items: RecipeImageDto[];
  className?: string;
};

const ImagesGallery = ({ items, className, ...props }: ImagesGalleryProps) => {
  const [isFullscreen, setIsFullscreen] = React.useState(false);

  return (
    <div
      className={cn(isFullscreen ? 'fixed left-0 top-0 w-full h-full m-0 bg-surf-cont-lowest z-40' : className)}
      data-fullscreen={isFullscreen}
    >
      {isFullscreen && (
        <ButtonIcon
          icon={IconClose}
          className="absolute top-5 right-5 cursor-pointer z-50"
          onClick={() => setIsFullscreen(false)}
          variant="filled"
        />
      )}
      <ImageGallery
        lazyLoad
        infinite
        showThumbnails
        additionalClass={isFullscreen ? 'w-full h-full' : ''}
        items={items.map(image => ({ original: getRecipeImageUrl(image.fileName), thumbnail: getRecipeImageUrl(image.fileName) }))}
        showPlayButton={false}
        onClick={() => setIsFullscreen(!isFullscreen)}
        {...props}
      />
    </div>
  );
};

export default ImagesGallery;
