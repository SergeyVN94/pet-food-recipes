import { RecipeCreateDto, RecipeIngredientUnitCreateDto } from '@/types';

export type FormFields = Omit<RecipeCreateDto, 'ingredients'> & {
  ingredients: Partial<RecipeIngredientUnitCreateDto>[];
};
