import { AxiosRequestConfig } from 'axios';

import { RecipeCreateDto, RecipeEntity, RecipeFilter, RecipeUpdateDto } from '@/types';

import { apiInstance } from './lib';

const BASE_API_URL = '/api/v1/recipes';

class RecipesService {
  static getRecipeBySlug(slug: string, config: AxiosRequestConfig = {}) {
    return apiInstance.get<RecipeEntity>(`${BASE_API_URL}/slug/${slug}`, config);
  }

  static getRecipeById(id: string, config: AxiosRequestConfig = {}) {
    return apiInstance.get<RecipeEntity>(`${BASE_API_URL}/${id}`, config);
  }

  static postRecipesSearch(filter: RecipeFilter = {}, config: AxiosRequestConfig = {}) {
    return apiInstance.post<RecipeEntity[]>(`${BASE_API_URL}/search`, filter, config);
  }

  static postRecipe(dto: RecipeCreateDto, config: AxiosRequestConfig = {}) {
    return apiInstance.post<RecipeEntity>(`${BASE_API_URL}`, dto, config);
  }

  static patchRecipe(slug: RecipeEntity['slug'], dto: RecipeUpdateDto, config: AxiosRequestConfig = {}) {
    return apiInstance.patch<RecipeEntity>(`${BASE_API_URL}/${slug}`, dto, config);
  }

  static deleteRecipe(slug: RecipeEntity['slug'], config: AxiosRequestConfig = {}) {
    return apiInstance.delete<RecipeEntity>(`${BASE_API_URL}/${slug}`, config);
  }

  static publishRecipe(slug: RecipeEntity['slug'], config: AxiosRequestConfig = {}) {
    return apiInstance.patch<RecipeEntity>(`${BASE_API_URL}/${slug}/publish`, undefined, config);
  }

  static unpublishRecipe(slug: RecipeEntity['slug'], config: AxiosRequestConfig = {}) {
    return apiInstance.patch<RecipeEntity>(`${BASE_API_URL}/${slug}/unpublish`, undefined, config);
  }
}

export default RecipesService;
