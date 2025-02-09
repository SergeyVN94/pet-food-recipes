import { AxiosRequestConfig } from 'axios';

import { RecipeCreateDto, RecipeDto, RecipeFilter, RecipeUpdateDto } from '@/types';

import { apiInstance } from './lib';

const BASE_API_URL = '/api/v1/recipes';

class RecipesService {
  static getRecipeBySlug(slug: string, config: AxiosRequestConfig = {}) {
    return apiInstance.get<RecipeDto>(`${BASE_API_URL}/slug/${slug}`, config);
  }

  static getRecipeById(id: string, config: AxiosRequestConfig = {}) {
    return apiInstance.get<RecipeDto>(`${BASE_API_URL}/${id}`, config);
  }

  static postRecipesSearch(filter: RecipeFilter = {}, config: AxiosRequestConfig = {}) {
    return apiInstance.post<RecipeDto[]>(`${BASE_API_URL}/search`, filter, config);
  }

  static postRecipe(dto: RecipeCreateDto, config: AxiosRequestConfig = {}) {
    return apiInstance.post<RecipeDto>(`${BASE_API_URL}`, dto, config);
  }

  static patchRecipe(slug: RecipeDto['slug'], dto: RecipeUpdateDto, config: AxiosRequestConfig = {}) {
    return apiInstance.patch<RecipeDto>(`${BASE_API_URL}/${slug}`, dto, config);
  }

  static deleteRecipe(slug: RecipeDto['slug'], config: AxiosRequestConfig = {}) {
    return apiInstance.delete<RecipeDto>(`${BASE_API_URL}/${slug}`, config);
  }
}

export default RecipesService;
