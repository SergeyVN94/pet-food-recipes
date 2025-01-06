import React from 'react';

import { parseAsBoolean, useQueryState } from 'nuqs';

import { RecipeFilter } from '@/types';

import useQueryIngredients from './useQueryIngredients';

const booleanParser = parseAsBoolean.withDefault(false);

const useRecipeFilter = () => {
  const [search] = useQueryState('q');
  const [includesIngredients] = useQueryIngredients('includes');
  const [excludesIngredients] = useQueryIngredients('excludes');
  const [isDeleted] = useQueryState('isDeleted', booleanParser);

  const filter = React.useMemo<RecipeFilter>(() => {
    const filter: RecipeFilter = {};

    if (search) {
      filter.q = search;
    }

    if (isDeleted) {
      filter.isDeleted = true;
    }

    if ((includesIngredients && includesIngredients.length > 0) || (excludesIngredients && excludesIngredients.length > 0)) {
      filter.ingredients = {};

      if (includesIngredients && includesIngredients.length > 0) {
        filter.ingredients.includes = includesIngredients;
      }

      if (excludesIngredients && excludesIngredients.length > 0) {
        filter.ingredients.excludes = excludesIngredients;
      }
    }

    return filter;
  }, [search, includesIngredients, excludesIngredients, isDeleted]);

  return filter;
};

export default useRecipeFilter;
