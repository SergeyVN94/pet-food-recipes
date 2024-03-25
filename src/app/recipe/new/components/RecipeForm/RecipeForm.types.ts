import { RecipeDto, RecipeDtoIngredient } from '@/types';

export type FormFields = Omit<RecipeDto, 'ingredients'> & {
  ingredients: Partial<RecipeDtoIngredient>[];
};
