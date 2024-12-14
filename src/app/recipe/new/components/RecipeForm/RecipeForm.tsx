'use client';

import React from 'react';

import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';

import { Button, FileInputUncontrolled, InputUncontrolled, TextareaControlled } from '@/components/ui';
import { useAmountTypes, useCreateRecipe, useRecipeIngredients } from '@/hooks';
import { RecipeIngredientUnitCreateDto } from '@/types';

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
  console.log(recipeIngredients);

  const { mutateAsync, isPending } = useCreateRecipe({
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
          content: '',
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
    if (isPending) {
      return;
    }

    const ingredients = formFields.ingredients.filter(
      ingredient => ingredient.count && ingredient.amountTypeId && ingredient.ingredientId,
    ) as RecipeIngredientUnitCreateDto[];

    mutateAsync({
      ...formFields,
      ingredients,
      steps: formFields.steps.map(step => step.content),
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} className={className}>
        <InputUncontrolled name="title" label="Название" required disabled={isPending} />
        <TextareaControlled name="description" label="Описание" className="mt-4" required disabled={isPending} />
        <FileInputUncontrolled
          name="images"
          label="Добавить изображения (максимум 3 файла по 5 Мб каждый)"
          multiple
          max={3}
          accept="image/png image/jpg image/jpeg"
          className="mt-4"
          disabled={isPending}
        />
        {isAmountTypesFetching || isRecipeIngredientsFetching ? (
          <div className="skeleton mt-4 h-48" />
        ) : (
          <Ingredients
            methods={methods}
            isLoading={isPending}
            amountTypes={amountTypes ?? []}
            recipeIngredients={recipeIngredients ?? []}
          />
        )}
        <Steps methods={methods} isLoading={isPending} />
        <Button className="mt-8" disabled={isPending}>
          Сохранить
        </Button>
      </form>
    </FormProvider>
  );
};

export default RecipeForm;
