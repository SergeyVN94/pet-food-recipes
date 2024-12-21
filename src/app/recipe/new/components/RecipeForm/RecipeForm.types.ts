import { RecipeCreateDto, RecipeIngredientCreateDto } from '@/types';

export type FormFields = Omit<RecipeCreateDto, 'ingredients' | 'steps'> & {
  ingredients: Partial<RecipeIngredientCreateDto>[];
  steps: {
    content: string;
  }[];
};
