import { RecipeEntity } from './recipe';

export type BookmarkDto = {
  id: string;
  title: string;
  slug: string;
  createdAt: string;
  updateAt: string;
};

export type BookmarkRecipeEntity = {
  id: string;
  recipeId: RecipeEntity['id'];
  bookmarkId: BookmarkDto['id'];
  createdAt: string;
};

export type BookmarkCreateDto = {
  title: string;
};

export type BookmarkRecipeCreateDto = {
  recipeId: string;
};
