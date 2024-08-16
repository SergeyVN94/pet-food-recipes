import { RecipeFilter } from '@/types';

export const urlSearchParamsToFilter = (params: URLSearchParams): RecipeFilter => {
  const filters: RecipeFilter = {
    q: params.get('q') ?? '',
  };

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
  const filters: RecipeFilter = {
    q: String(params.q ?? ''),
  };

  const includesIngredients = (Array.isArray(params['ingr-inc[]']) ? params['ingr-inc[]'] : [])
    .map(i => i.trim().toLowerCase())
    .filter(Boolean);

  const excludesIngredients = (Array.isArray(params['ingr-exc[]']) ? params['ingr-exc[]'] : [])
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
