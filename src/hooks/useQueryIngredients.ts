import { parseAsArrayOf, parseAsInteger, useQueryState } from 'nuqs';

const parserIngredients = parseAsArrayOf(parseAsInteger);

const useQueryIngredients = (variant: 'includes' | 'excludes') => useQueryState<number[]>(variant ? 'inc[]' : 'exc[]', parserIngredients);

export default useQueryIngredients;
