import { default as AuthService } from './AuthService';
import { default as BansService } from './BansService';
import { default as BookmarksService } from './BookmarksService';
import { default as IngredientsService } from './IngredientsService';
import { default as RecipesService } from './RecipesService';
import { default as UsersService } from './UsersService';
import { apiInstance } from './lib';

export const authService = new AuthService(apiInstance, '/api/v1/auth');
export const bansService = new BansService(apiInstance, '/api/v1/bans');
export const usersService = new UsersService(apiInstance, '/api/v1/users');
export const recipesService = new RecipesService(apiInstance, '/api/v1/recipes');
export const bookmarksService = new BookmarksService(apiInstance, '/api/v1/bookmarks');
export const ingredientsService = new IngredientsService(apiInstance, '/api/v1/ingredients');
