'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import { Button, FileInputControlled, InputControlled, TextareaControlled } from '@/components/ui';
import { useAmountTypes, useMakeRecipe, useRecipeIngredients } from '@/hooks';
import { RecipeDtoIngredient } from '@/types';
import { Ingredients, Steps } from './local-components';
import { FormFields } from './RecipeForm.types';

const RecipeForm = ({ className }: { className?: string }) => {
  const navigate = useRouter();
  const { data: amountTypes, isFetching: isAmountTypesFetching } = useAmountTypes({
    refetchOnMount: true,
  });
  const { data: recipeIngredients, isFetching: isRecipeIngredientsFetching } = useRecipeIngredients({
    refetchOnMount: true,
  });

  const { mutateAsync, isLoading } = useMakeRecipe({
    onSuccess: (data) => {
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
      (i) => i.count && i.amountTypeId && i.ingredientId,
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
        <InputControlled name="title" label="Название" required disabled={isLoading} />
        <TextareaControlled name="description" label="Описание" className="mt-4" required disabled={isLoading} />
        <FileInputControlled
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
