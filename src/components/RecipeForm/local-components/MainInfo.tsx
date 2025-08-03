'use client';

import React from 'react';

import { useFormContext } from 'react-hook-form';

import { useNewRecipeImages } from '@/hooks';
import { recipesService } from '@/services';
import { RecipeEntity, RecipeImageDto } from '@/types';
import { FileInput, ImageUploaded, ImageUploader, InputUncontrolled, TextareaUncontrolled } from '@/ui';
import { getRecipeImageUrl, showToast } from '@/utils';

import { RecipeFormFields } from '..';

type MainInfoProps = {
  initialRecipe?: RecipeEntity;
};

const MainInfo = ({ initialRecipe }: MainInfoProps) => {
  const [files, setFiles] = React.useState<File[]>([]);
  const [recipeImages, setRecipeImages] = React.useState<RecipeImageDto[]>(() => initialRecipe?.images ?? []);
  const methods = useFormContext<RecipeFormFields>();

  const { data: newRecipeImages } = useNewRecipeImages({
    refetchOnMount: true,
  });

  const handleFilesChange = (newFiles: File[]) => {
    const nextFiles = [...files, ...newFiles];

    if (nextFiles.length > 10) {
      showToast('error', 'Максимум 10 файлов');
      return;
    }

    const bigFile = nextFiles.find(file => file.size > 15 * 1024 * 1024);

    if (bigFile) {
      showToast('error', 'Максимум 15 МБ на один файл');
      return;
    }

    setFiles([...files, ...newFiles]);
  };

  React.useEffect(() => {
    if (!newRecipeImages || newRecipeImages.length === 0) {
      return;
    }

    setRecipeImages(prev => {
      const prevMap = prev.reduce<Record<string, RecipeImageDto>>((acc, image) => {
        acc[image.id] = image;
        return acc;
      }, {});

      return [...prev, ...newRecipeImages.filter(image => !prevMap[image.id])];
    });
  }, [newRecipeImages]);

  React.useEffect(() => {
    methods.setValue(
      'images',
      recipeImages.map(image => image.id),
    );
  }, [recipeImages]);

  return (
    <fieldset>
      <legend className="sr-only">Основная информация о рецепте</legend>
      <InputUncontrolled name="title" label="Название" required maxLength={150} />
      <TextareaUncontrolled name="description" label="Описание" className="mt-4" required maxLength={500} />
      {(files.length > 0 || recipeImages.length > 0) && (
        <div className="flex flex-wrap gap-4 mt-8">
          {recipeImages.map(image => (
            <ImageUploaded
              key={image.id}
              isNew={image.recipeId === null}
              deleteImage={image.recipeId ? undefined : id => recipesService.deleteImage(id)}
              onDelete={() => setRecipeImages(recipeImages.filter(_image => _image.id !== image.id))}
              image={{
                fileName: image.fileName,
                url: getRecipeImageUrl(image.fileName),
                id: image.id,
              }}
            />
          ))}
          {files.map(file => (
            <ImageUploader
              file={file}
              key={file.name}
              uploadFile={(file, config) => recipesService.uploadImage(file, undefined, config)}
              onDelete={() => setFiles(files.filter(_file => _file.name !== file.name))}
              onUpload={image => {
                setFiles(files.filter(_file => _file.name !== file.name));
                setRecipeImages([...recipeImages, image]);
              }}
            />
          ))}
        </div>
      )}
      <FileInput
        multiple
        name="images"
        label="Добавить изображения (максимум 10 файлов по 15 Мб каждый)"
        className="mt-4"
        max={3}
        accept="image/png image/jpg image/jpeg"
        onChange={handleFilesChange}
      />
    </fieldset>
  );
};

export default MainInfo;
