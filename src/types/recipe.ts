export type Recipe = {
  id: number;
  title: string;
  slug: string;
  description: string;
  ingredients: number[];
  images: string[];
};

export type RecipeDto = {
  title: string;
  description: string;
  images?: FileList | File[];
};
