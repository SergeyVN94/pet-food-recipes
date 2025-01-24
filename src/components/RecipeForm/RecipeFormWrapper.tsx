'use client';

import React from 'react';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { FieldErrors } from 'react-hook-form';

import { useCreateRecipe, useUpdateRecipe } from '@/hooks';
import { RecipeCreateDto, RecipeDto } from '@/types';
import { showToast } from '@/utils';

import RecipeForm from './RecipeForm';
import { FormFields } from './RecipeForm.types';

type RecipeFormWrapperProps = {
  initialRecipe?: RecipeDto;
  className?: string;
};

const RecipeFormWrapper = ({ className, initialRecipe }: RecipeFormWrapperProps) => {
  const { mutateAsync: update, data: updatedRecipe, isPending: isUpdating, error: updateError } = useUpdateRecipe();
  const { mutateAsync: create, data: createdRecipe, isPending: isCreating, error: createError } = useCreateRecipe();
  const navigate = useRouter();
  const [errors, setErrors] = React.useState<FieldErrors<FormFields>>({});
  const isLoading = isUpdating || isCreating;

  const handleFormSubmit = async (data: RecipeCreateDto) => {
    setErrors({});
    initialRecipe ? await update({ dto: data, slug: initialRecipe.slug }) : await create(data);
  };

  React.useEffect(() => {
    const error = initialRecipe ? updateError : createError;

    if (error) {
      let message = 'Ошибка при обновлении рецепта';

      if (axios.isAxiosError(error)) {
        if (error.response?.data?.message === 'RECIPE_WITH_THIS_TITLE_ALREADY_EXISTS') {
          setErrors({
            title: {
              type: 'validate',
              message: 'Рецепт с таким названием уже существует',
            },
          });
        }
      }

      showToast('error', message);
    }
  }, [updateError, createError]);

  React.useEffect(() => {
    const data = initialRecipe ? updatedRecipe : createdRecipe;

    if (data) {
      navigate.push(`/recipe/${data.slug}`);
      showToast('success', `Рецепт успешно ${initialRecipe ? 'обновлен' : 'создан'}`);
    }
  }, [updatedRecipe, createdRecipe]);

  return (
    <RecipeForm onSubmit={handleFormSubmit} isLoading={isLoading} errors={errors} className={className} initialRecipe={initialRecipe} />
  );
};

export default RecipeFormWrapper;
