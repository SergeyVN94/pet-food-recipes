import { RecipeDto } from './recipe';

export type BookmarkDto = {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
  updateAt: string;
};

export type BookmarkRecipeDto = {
  id: string;
  recipeId: RecipeDto['id'];
  bookmarkId: BookmarkDto['id'];
  createdAt: string;
};

export type BookmarkCreateDto = {
  title: string;
};

export type BookmarkRecipeCreateDto = {
  recipeId: string;
};
