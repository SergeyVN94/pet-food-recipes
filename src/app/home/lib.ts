import { parseAsArrayOf, parseAsInteger } from 'nuqs/server';

import { RecipeFilter } from '@/types';

const parserIngredients = parseAsArrayOf(parseAsInteger);

export const searchParamsToFilter = (params: Record<string, string | string[]>): RecipeFilter => {
  const filters: RecipeFilter = {};

  if (params.q) {
    filters.q = (params.q ?? '') as string;
  }

  if (params.isDeleted === 'true') {
    filters.isDeleted = true;
  }

  const includesIngredients = parserIngredients.parse(params['inc[]']?.toString() ?? '') ?? [];
  const excludesIngredients = parserIngredients.parse(params['inc[]']?.toString() ?? '') ?? [];

  if (includesIngredients.length > 0 || excludesIngredients.length > 0) {
    filters.ingredients = {};

    if (includesIngredients.length > 0) {
      filters.ingredients.includes = includesIngredients.map(Number).filter(Boolean);
    }

    if (excludesIngredients.length > 0) {
      filters.ingredients.excludes = excludesIngredients.map(Number).filter(Boolean);
    }
  }

  return filters;
};
