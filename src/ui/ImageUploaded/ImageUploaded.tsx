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
  className?: string;
  onDelete?: (id: UploadedImage['id']) => void;
  deleteImage?: (imageId: UploadedImage['id']) => Promise<UploadedImage>;
};

const ImageUploaded = ({ image, className, deleteImage, onDelete }: ImageUploadedProps) => {
  const { mutate, isPending, error } = useMutation({
    mutationKey: ['images', 'delete', image.id],
    mutationFn: async () => await deleteImage?.(image.id),
    onSuccess: () => onDelete?.(image.id),
  });

  const handleDeleteImage = () => {
    if (isPending) {
      return;
    }

    if (deleteImage) {
      mutate();
    } else {
      onDelete?.(image.id);
    }
  };

  return (
    <div
      className={cn('flex flex-nowrap items-center gap-2 border border-transparent relative rounded-2xl overflow-hidden', className, {
        'pointer-progress': isPending,
        'border-error': error,
      })}
    >
      <ButtonIcon
        type="button"
        icon={IconClose}
        onClick={handleDeleteImage}
        className="absolute top-0 right-0 translate-1/2"
        variant="filled"
      />
      {error && (
        <ButtonIcon
          type="button"
          icon={IconReplay}
          onClick={handleDeleteImage}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          variant="filled"
        />
      )}
      <img src={getRecipeImageUrl(image.fileName)} alt="" className="w-32 h-32 object-cover" />
    </div>
  );
};

export default ImageUploaded;
