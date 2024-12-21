import { AxiosRequestConfig } from 'axios';

import { RecipeCreateDto, RecipeDto, RecipeFilter } from '@/types';

import { apiInstance } from './lib';

const BASE_API_URL = '/api/v1/recipes';

class RecipeService {
  static getRecipe(slug: string, config: AxiosRequestConfig = {}) {
    return apiInstance.get<RecipeDto>(`${BASE_API_URL}/${slug}`, config);
  }

  static postRecipesSearch(filter: RecipeFilter = {}, config: AxiosRequestConfig = {}) {
    return apiInstance.post<RecipeDto[]>(`${BASE_API_URL}/search`, filter, config);
  }

  static postRecipe(dto: RecipeCreateDto, config: AxiosRequestConfig = {}) {
    const formData = new FormData();

    formData.set('title', dto.title);
    formData.set('description', dto.description);
    Array.from(dto.images ?? [])?.forEach(image => {
      formData.append('images', image);
    });
    dto.steps.forEach((step, index) => {
      formData.append(`steps[${index}]`, step);
    });
    dto.ingredients.forEach((ingredient, index) => {
      formData.append(`ingredients[${index}]`, JSON.stringify(ingredient));
    });
    formData.append('tags[]', '');

    return apiInstance.post<RecipeDto>(`${BASE_API_URL}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config.headers,
      },
      ...config,
    });
  }
}

export default RecipeService;
