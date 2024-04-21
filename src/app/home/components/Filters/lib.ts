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
  const includesIngredientsMap = params
    .getAll('ingr-inc[]')
    .map((i) => i.trim().toLowerCase())
    .filter(Boolean)
    .reduce((acc, val) => acc.set(val, true), new Map());

  const excludesIngredientsMap = params
    .getAll('ingr-exc[]')
    .map((i) => i.trim().toLowerCase())
    .filter(Boolean)
    .reduce((acc, val) => acc.set(val, null), new Map());

  const ingredientItems = ingredients.map((item, index) => ({
    index,
    id: item.id,
    name: item.name,
    value: includesIngredientsMap.get(item.id) || excludesIngredientsMap.get(item.id),
  }));

  return {
    ingredients: ingredientItems,
  };
};
