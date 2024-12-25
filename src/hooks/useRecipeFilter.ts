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

  const filter = React.useMemo<RecipeFilter>(
    () => ({
      isDeleted,
      q: search || undefined,
      ingredients: {
        includes: includesIngredients || [],
        excludes: excludesIngredients || [],
      },
    }),
    [search, includesIngredients, excludesIngredients, isDeleted],
  );

  return filter;
};

export default useRecipeFilter;
