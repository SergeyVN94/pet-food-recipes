/* eslint-disable @next/next/no-img-element */
import React from 'react';

import { useMutation } from '@tanstack/react-query';

import { IconClose, IconReplay } from '@/assets/icons';
import { ButtonIcon } from '@/ui';
import { cn, getRecipeImageUrl } from '@/utils';

export type UploadedImage = {
  id: string;
  url: string;
  fileName: string;
};

type ImageUploadedProps = {
  image: UploadedImage;
  isNew?: boolean;
  className?: string;
  onDelete?: (id: UploadedImage['id']) => void;
  deleteImage?: (imageId: UploadedImage['id']) => Promise<unknown>;
};

const ImageUploaded = ({ image, className, deleteImage, onDelete, isNew }: ImageUploadedProps) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: ['images', 'delete', image.id],
    mutationFn: async () => await deleteImage?.(image.id),
    onSuccess: () => onDelete?.(image.id),
  });

  const handleDeleteImage = () => {
    if (isPending) {
      return;
    }

    console.log(image, deleteImage);

    if (deleteImage) {
      mutate();
    } else {
      onDelete?.(image.id);
    }
  };

  return (
    <div
      className={cn('flex flex-nowrap items-center gap-2 relative rounded-2xl', className, {
        'pointer-progress': isPending,
        'border-error': error,
        'outline-2 outline-green-500 outline-offset-2': isNew,
      })}
    >
      <div className="absolute top-0 right-0 flex flex-col">
        <ButtonIcon type="button" icon={IconClose} onClick={handleDeleteImage} variant="filled" />
        {error && <ButtonIcon type="button" icon={IconReplay} onClick={handleDeleteImage} variant="filled" />}
      </div>
      {isNew && (
        <p className="absolute top-auto left-1/2 bottom-1 -translate-x-1/2 whitespace-nowrap  text-sm text-on-primary-container bg-primary-container p-1 rounded">
          Не сохранено
        </p>
      )}
      <img
        src={getRecipeImageUrl(image.fileName)}
        alt=""
        className="w-44 h-64 object-cover rounded-2xl"
        title={isNew ? 'Новое изображение' : ''}
      />
    </div>
  );
};

export default ImageUploaded;
