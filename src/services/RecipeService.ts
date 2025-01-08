import { AxiosRequestConfig } from 'axios';

import { RecipeCreateDto, RecipeDto, RecipeFilter } from '@/types';

import { apiInstance } from './lib';

const BASE_API_URL = '/api/v1/recipes';

class RecipeService {
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
}

export default RecipeService;
