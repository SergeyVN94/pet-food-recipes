'use client';

import React from 'react';

import { useRouter } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';

import { Button, FileInputUncontrolled, InputUncontrolled, TextareaControlled } from '@/components/ui';
import { useAmountTypes, useCreateRecipe, useIngredients } from '@/hooks';
import { RecipeIngredientCreateDto } from '@/types';
import { arrayToDictionary, showToast } from '@/utils';

import { FormFields } from './RecipeForm.types';
import { Ingredients, Steps } from './local-components';

const RecipeForm = ({ className }: { className?: string }) => {
  const navigate = useRouter();
  const { data: amountTypes, isFetching: isAmountTypesFetching } = useAmountTypes({
    refetchOnMount: true,
  });
  const { data: recipeIngredients, isFetching: isRecipeIngredientsFetching } = useIngredients({
    refetchOnMount: true,
  });
  const amountTypesDict = React.useMemo(() => arrayToDictionary(amountTypes ?? [], 'id'), [amountTypes]);

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

    const ingredients = formFields.ingredients.reduce<RecipeIngredientCreateDto[]>((acc, val) => {
      const amountType = amountTypesDict[val.amountTypeId!];
      const isValidCount = Number(val.count) > 0 || amountType?.slug === 'po_vkusu';

      if (amountType && val.ingredientId && isValidCount) {
        acc.push({
          count: Number(val.count),
          ingredientId: Number(val.ingredientId),
          amountTypeId: Number(val.amountTypeId),
        });
      }

      return acc;
    }, []);

    if (ingredients.length === 0) {
      showToast('error', 'Добавьте хотя бы один ингредиент');
      return;
    }

    mutateAsync({
      ...formFields,
      ingredients,
      steps: formFields.steps.map(step => step.content),
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} className={className}>
        <InputUncontrolled name="title" label="Название" required disabled={isPending} maxLength={150} />
        <TextareaControlled name="description" label="Описание" className="mt-4" required disabled={isPending} maxLength={500} />
        {/* <FileInputUncontrolled
          name="images"
          label="Добавить изображения (максимум 3 файла по 5 Мб каждый)"
          multiple
          max={3}
          accept="image/png image/jpg image/jpeg"
          className="mt-4"
          disabled={isPending}
        /> */}
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
