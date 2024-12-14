import { RecipeCreateDto, RecipeIngredientUnitCreateDto } from '@/types';

export type FormFields = Omit<RecipeCreateDto, 'ingredients' | 'steps'> & {
  ingredients: Partial<RecipeIngredientUnitCreateDto>[];
  steps: {
    content: string;
  }[];
};
