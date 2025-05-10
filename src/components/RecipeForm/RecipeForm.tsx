'use client';

import React from 'react';

import { vestResolver } from '@hookform/resolvers/vest';
import { useRouter } from 'next/navigation';
import { FieldErrors, FormProvider, useForm } from 'react-hook-form';

import { useAmountTypes, useIngredients } from '@/hooks';
import { RecipeCreateDto, RecipeEntity, RecipeIngredientCreateDto } from '@/types';
import { Button, InputUncontrolled, TextareaUncontrolled } from '@/ui';
import { arrayToDictionary, showToast } from '@/utils';

import { FormFields } from './RecipeForm.types';
import { validationSuite } from './lib';
import { Ingredients, Steps } from './local-components';

type RecipeFormProps = {
  onSubmit: (formFields: RecipeCreateDto) => void;
  isLoading?: boolean;
  initialRecipe?: RecipeEntity;
  className?: string;
  errors?: FieldErrors<FormFields>;
};

const RecipeForm = ({ initialRecipe, className, errors = {}, isLoading, onSubmit }: RecipeFormProps) => {
  const navigate = useRouter();
  const { data: amountTypes, isFetching: isAmountTypesFetching } = useAmountTypes({
    refetchOnMount: true,
  });
  const { data: recipeIngredients, isFetching: isRecipeIngredientsFetching } = useIngredients({
    refetchOnMount: true,
  });
  const amountTypesDict = React.useMemo(() => arrayToDictionary(amountTypes ?? [], 'id'), [amountTypes]);

  const defaultValues = React.useMemo(
    () => ({
      title: initialRecipe?.title ?? '',
      description: initialRecipe?.description ?? '',
      steps: initialRecipe?.steps.map(step => ({ content: step.content })) ?? [{ content: '' }],
      ingredients: initialRecipe?.ingredients.map(ingredient => ({
        count: ingredient.count,
        ingredientId: String(ingredient.ingredientId),
        amountTypeId: String(ingredient.amountTypeId),
      })) ?? [{ count: 0 }],
    }),
    [initialRecipe],
  );

  const methods = useForm<FormFields>({
    defaultValues,
    errors,
    resolver: vestResolver(validationSuite),
    mode: 'onChange',
  });

  const handleSubmit = (formFields: FormFields) => {
    if (isLoading) {
      return;
    }

    const ingredients = formFields.ingredients.reduce<RecipeIngredientCreateDto[]>((acc, val) => {
      const amountType = amountTypesDict[Number(val.amountTypeId)];
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

    onSubmit({
      ...formFields,
      ingredients,
      steps: formFields.steps.map(step => step.content),
    });
  };

  const handleCancel = () => {
    navigate.back();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)} className={className}>
        <fieldset>
          <legend className="invisible">Основная информация о рецепте</legend>
          <InputUncontrolled name="title" label="Название" required maxLength={150} />
          <TextareaUncontrolled name="description" label="Описание" className="mt-4" required maxLength={500} />
          {/* <FileInputUncontrolled
          name="images"
          label="Добавить изображения (максимум 3 файла по 5 Мб каждый)"
          multiple
          max={3}
          accept="image/png image/jpg image/jpeg"
          className="mt-4"
          disabled={isPending}
        /> */}
        </fieldset>
        {isAmountTypesFetching || isRecipeIngredientsFetching ? (
          <div className="mt-4 skeleton h-48" />
        ) : (
          <Ingredients amountTypes={amountTypes ?? []} recipeIngredients={recipeIngredients ?? []} />
        )}
        <Steps />
        <div className="mt-8 flex flex-nowrap gap-2">
          <Button disabled={isLoading}>Сохранить</Button>
          {initialRecipe && (
            <Button type="button" variant="outline" onClick={handleCancel}>
              Отменить
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};

export default RecipeForm;
