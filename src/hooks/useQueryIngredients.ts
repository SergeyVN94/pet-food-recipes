'use client';

import { parseAsArrayOf, parseAsInteger, useQueryState } from 'nuqs';

const parserIngredients = parseAsArrayOf(parseAsInteger, ';');

const useQueryIngredients = (variant: 'includes' | 'excludes') => useQueryState<number[]>(variant, parserIngredients);

export default useQueryIngredients;
