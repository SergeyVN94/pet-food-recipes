import { ReadonlyURLSearchParams } from 'next/navigation';

import { RecipeIngredient } from '@/types';

import { FormFields } from './types';

export const searchParamsToFormFields = ({
  params,
  ingredients,
}: {
  params: ReadonlyURLSearchParams;
  ingredients: RecipeIngredient[];
}): FormFields => {
  const ingredientsMap = new Map<string, boolean | null>();

  params
    .getAll('ingr-inc[]')
    .map(i => i.trim().toLowerCase())
    .filter(Boolean)
    .reduce((acc, val) => acc.set(val, true), ingredientsMap);

  params
    .getAll('ingr-exc[]')
    .map(i => i.trim().toLowerCase())
    .filter(Boolean)
    .reduce((acc, val) => acc.set(val, null), ingredientsMap);

  return {
    ingredients: ingredientsMap,
  };
};
