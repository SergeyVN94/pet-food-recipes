'use client';

import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import { RecipeImageDto } from '@/types';
import { getRecipeImageUrl } from '@/utils';

type ImagesGalleryProps = Omit<
  React.ComponentProps<typeof ImageGallery>,
  'items' | 'lazyLoad' | 'infinite' | 'showThumbnails' | 'showPlayButton'
> & {
  items: RecipeImageDto[];
};

const ImagesGallery = ({ items, ...props }: ImagesGalleryProps) => (
  <ImageGallery
    lazyLoad
    infinite
    showThumbnails
    items={items.map(image => ({ original: getRecipeImageUrl(image), thumbnail: getRecipeImageUrl(image) }))}
    showPlayButton={false}
    {...props}
  />
);

export default ImagesGallery;
