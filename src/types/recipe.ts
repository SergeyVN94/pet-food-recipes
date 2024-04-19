export type AmountType = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updateAt: string;
};

export type RecipeIngredient = {
  id: string;
  slug: string;
  name: string;
  description: string;
  amountTypes: AmountType[];
  createdAt: string;
  updateAt: string;
  image?: string;
};

export type RecipeIngredientUnit = {
  id: string;
  count: number;
  ingredient: RecipeIngredient;
  amountType: AmountType;
  createdAt: string;
};

export type Recipe = {
  id: string;
  title: string;
  slug: string;
  description: string;
  ingredients: RecipeIngredientUnit[];
  images: string[];
  steps: string[];
  createdAt: string;
  updateAt: string;
};

export type RecipeDtoStep = {
  order: number;
  value: string;
};

export type RecipeDtoIngredient = {
  ingredientId: RecipeIngredient['id'];
  amountTypeId: AmountType['id'];
  count: number;
};

export type RecipeDto = {
  title: string;
  description: string;
  images?: FileList | File[];
  steps: RecipeDtoStep[];
  ingredients: RecipeDtoIngredient[];
};

export type RecipeFilter = {
  q?: string;
  ingredients?: string[];
};
