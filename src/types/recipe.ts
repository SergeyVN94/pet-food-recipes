export type AmountTypeDto = {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
  updateAt: string;
};

export type RecipeIngredientDto = {
  id: number;
  slug: string;
  name: string;
  description: string;
  amountTypes: AmountTypeDto[];
  createdAt: string;
  updateAt: string;
  image?: string;
};

export type RecipeIngredientUnitDto = {
  id: string;
  count: number;
  ingredient: RecipeIngredientDto;
  amountType: AmountTypeDto;
  createdAt: string;
};

export type RecipeStepDto = {
  order: number;
  value: string;
};

export type RecipeDto = {
  id: string;
  title: string;
  slug: string;
  description: string;
  images: string[];
  steps: RecipeStepDto[];
  ingredients: RecipeIngredientUnitDto[];
};

export type RecipeIngredientUnitCreateDto = {
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
  ingredients: RecipeIngredientUnitCreateDto[];
};

export type RecipeFilter = {
  q?: string;
  ingredients?: {
    includes?: string[];
    excludes?: string[];
  };
};
