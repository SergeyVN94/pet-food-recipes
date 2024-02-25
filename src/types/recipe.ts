export type Recipe = {
  id: number;
  title: string;
  slug: string;
  description: string;
  ingredients: number[];
  images: string[];
  steps: string[];
};

export type RecipeDtoStep = {
  order: number;
  value: string;
};

export type RecipeDto = {
  title: string;
  description: string;
  images?: FileList | File[];
  steps: RecipeDtoStep[];
};
