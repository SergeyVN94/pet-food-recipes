import { UserDto } from './user';

export type AmountTypeDto = {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
  updateAt: string;
};

export type IngredientDto = {
  id: number;
  slug: string;
  name: string;
  description: string;
  amountTypes: number[];
  createdAt: string;
  updateAt: string;
  image?: string;
};

export type RecipeIngredientDto = {
  id: string;
  count: number;
  ingredientId: number;
  amountTypeId: number;
  createdAt: string;
};

export type RecipeStepDto = {
  order: number;
  content: string;
};

export type RecipeDto = {
  id: string;
  title: string;
  slug: string;
  description: string;
  images: string[];
  steps: RecipeStepDto[];
  ingredients: RecipeIngredientDto[];
  user: UserDto;
  createdAt: string;
  updateAt: string;
};

export type RecipeIngredientCreateDto = {
  count: number;
  ingredientId: number;
  amountTypeId: number;
};

export type RecipeCreateDto = {
  title: string;
  description: string;
  tags: string[];
  images: string[];
  steps: string[];
  ingredients: RecipeIngredientCreateDto[];
};

export type RecipeFilter = {
  isDeleted?: boolean;
  q?: string;
  ingredients?: {
    includes?: IngredientDto['id'][];
    excludes?: IngredientDto['id'][];
  };
};
