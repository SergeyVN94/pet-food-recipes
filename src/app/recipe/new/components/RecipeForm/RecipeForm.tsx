'use client';

import React from 'react';

import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';

import { Button, FileInputUncontrolled, InputUncontrolled, TextareaControlled } from '@/components/ui';
import { useAmountTypes, useMakeRecipe, useRecipeIngredients } from '@/hooks';
import { RecipeDtoIngredient } from '@/types';

import { FormFields } from './RecipeForm.types';
import { Ingredients, Steps } from './local-components';

const RecipeForm = ({ className }: { className?: string }) => {
  const navigate = useRouter();
  const { data: amountTypes, isFetching: isAmountTypesFetching } = useAmountTypes({
    refetchOnMount: true,
  });
  const { data: recipeIngredients, isFetching: isRecipeIngredientsFetching } = useRecipeIngredients({
    refetchOnMount: true,
  });

  const { mutateAsync, isLoading } = useMakeRecipe({
    onSuccess: data => {
      navigate.push(`/recipe/${data.slug}`);
    },
  });
  const methods = useForm<FormFields>({
    defaultValues: {
      title: '',
      description: '',
      steps: [
        {
          order: 0,
          value: '',
        },
      ],
      ingredients: [
        {
          count: 0,
        },
      ],
    },
  });

  const handleSubmit = (formFields: FormFields) => {
    if (isLoading) {
      return;
    }

    const ingredients: RecipeDtoIngredient[] = formFields.ingredients.filter(
      i => i.count && i.amountTypeId && i.ingredientId,
    ) as RecipeDtoIngredient[];

    console.log(formFields);
    mutateAsync({
      ...formFields,
      ingredients,
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} className={className}>
        <InputUncontrolled name="title" label="Название" required disabled={isLoading} />
        <TextareaControlled name="description" label="Описание" className="mt-4" required disabled={isLoading} />
        <FileInputUncontrolled
          name="images"
          label="Добавить изображения (максимум 3 файла по 5 Мб каждый)"
          multiple
          accept="image/png image/jpg image/jpeg"
          className="mt-4"
          disabled={isLoading}
        />
        {isAmountTypesFetching || isRecipeIngredientsFetching ? (
          <div className="skeleton mt-4 h-48" />
        ) : (
          <Ingredients
            methods={methods}
            isLoading={isLoading}
            amountTypes={amountTypes ?? []}
            recipeIngredients={recipeIngredients ?? []}
          />
        )}
        <Steps methods={methods} isLoading={isLoading} />
        <Button className="mt-8" disabled={isLoading}>
          Сохранить
        </Button>
      </form>
    </FormProvider>
  );
};

export default RecipeForm;
