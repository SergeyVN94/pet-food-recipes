'use client';

import React from 'react';

import { vestResolver } from '@hookform/resolvers/vest';
import { useRouter } from 'next/navigation';
import { FieldErrors, FormProvider, useForm } from 'react-hook-form';

import { useAmountTypes, useIngredients } from '@/hooks';
import { RecipeCreateDto, RecipeEntity, RecipeIngredientCreateDto } from '@/types';
import { Button } from '@/ui';
import { arrayToDictionary, showToast } from '@/utils';

import { FormFields } from './RecipeForm.types';
import { validationSuite } from './lib';
import { AdditionalParams, Ingredients, MainInfo, Steps } from './local-components';

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

  const methods = useForm<FormFields>({
    defaultValues: {
      title: initialRecipe?.title ?? '',
      description: initialRecipe?.description ?? '',
      steps: initialRecipe?.steps.map(step => ({ content: step.content })) ?? [{ content: '' }],
      ingredients: initialRecipe?.ingredients.map(ingredient => ({
        count: ingredient.count,
        ingredientId: String(ingredient.ingredientId),
        amountTypeId: String(ingredient.amountTypeId),
      })) ?? [{ count: 0 }],
      images: initialRecipe?.images.map(image => image.id) ?? [],
    },
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
        <MainInfo initialRecipe={initialRecipe} />
        {/* <AdditionalParams /> */}
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
