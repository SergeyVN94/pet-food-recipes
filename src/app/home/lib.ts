import { RecipeFilter } from '@/types';

export const urlSearchParamsToFilter = (params: URLSearchParams): RecipeFilter => {
  const filters: RecipeFilter = {};

  if (params.get('q')?.trim()) {
    filters.q = params.get('q')?.trim() ?? '';
  }

  if (params.get('isDeleted') === 'true') {
    filters.isDeleted = true;
  }

  const includesIngredients = params
    .getAll('ingr-inc[]')
    .map(i => i.trim().toLowerCase())
    .filter(Boolean);

  const excludesIngredients = params
    .getAll('ingr-exc[]')
    .map(i => i.trim().toLowerCase())
    .filter(Boolean);

  if (includesIngredients.length > 0 || excludesIngredients.length > 0) {
    filters.ingredients = {};

    if (includesIngredients.length > 0) {
      filters.ingredients.includes = includesIngredients;
    }

    if (excludesIngredients.length > 0) {
      filters.ingredients.excludes = excludesIngredients;
    }
  }

  return filters;
};

export const searchParamsToFilter = (params: Record<string, string | string[]>): RecipeFilter => {
  const filters: RecipeFilter = {};

  if (params.q) {
    filters.q = (params.q ?? '') as string;
  }

  if (params.isDeleted === 'true') {
    filters.isDeleted = true;
  }

  const includesIngredients = (
    params['ingr-inc[]'] ? (Array.isArray(params['ingr-inc[]']) ? params['ingr-inc[]'] : [params['ingr-inc[]']]) : []
  )
    .map(i => i.trim().toLowerCase())
    .filter(Boolean);

  const excludesIngredients = (
    params['ingr-exc[]'] ? (Array.isArray(params['ingr-exc[]']) ? params['ingr-exc[]'] : [params['ingr-exc[]']]) : []
  )
    .map(i => i.trim().toLowerCase())
    .filter(Boolean);

  if (includesIngredients.length > 0 || excludesIngredients.length > 0) {
    filters.ingredients = {};

    if (includesIngredients.length > 0) {
      filters.ingredients.includes = includesIngredients;
    }

    if (excludesIngredients.length > 0) {
      filters.ingredients.excludes = excludesIngredients;
    }
  }

  return filters;
};
