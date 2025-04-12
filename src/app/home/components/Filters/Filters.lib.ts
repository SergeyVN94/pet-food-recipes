import { ReadonlyURLSearchParams } from 'next/navigation';

import { IngredientDto } from '@/types';

import { FormFields } from './Filters.types';

export const searchParamsToFormFields = ({
  params,
  ingredients,
}: {
  params: ReadonlyURLSearchParams;
  ingredients: IngredientDto[];
}): FormFields => {
  const existIngredientsIdMap = ingredients.reduce<Record<string, IngredientDto>>((acc, ingredient) => {
    acc[ingredient.id] = ingredient;

    return acc;
  }, {});

  const includesIngredients = params.getAll('ingr-inc[]').reduce<Record<string, boolean>>((acc, val) => {
    const normalizedIngredientId = val.trim().toLowerCase();

    if (existIngredientsIdMap[normalizedIngredientId]) {
      acc[normalizedIngredientId] = true;
    }

    return acc;
  }, {});

  const excludesIngredients = params.getAll('ingr-exc[]').reduce<Record<string, boolean>>((acc, val) => {
    const normalizedIngredientId = val.trim().toLowerCase();

    if (existIngredientsIdMap[normalizedIngredientId]) {
      acc[normalizedIngredientId] = true;
    }

    return acc;
  }, {});

  return {
    includesIngredients,
    excludesIngredients,
    isDeleted: params.get('isDeleted') === 'true',
    isPublished: params.get('isPublished') === 'true',
  };
};
