import { RecipeCreateDto, RecipeIngredientCreateDto } from '@/types';

export type FormFields = Omit<RecipeCreateDto, 'ingredients' | 'steps'> & {
  ingredients: {
    count: number;
    ingredientId?: string;
    amountTypeId?: string;
  }[];
  steps: {
    content: string;
  }[];
};
