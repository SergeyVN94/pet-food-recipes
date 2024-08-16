import { AxiosRequestConfig } from 'axios';

import { AmountType, RecipeIngredient } from '@/types';

import { apiInstance } from './lib';

const BASE_API_URL = '/api/v1/recipe-ingredients';

class RecipeIngredientService {
  static getRecipeIngredients(config: AxiosRequestConfig = {}) {
    return apiInstance.get<RecipeIngredient[]>(`${BASE_API_URL}`, config);
  }

  static getAmountTypes(config: AxiosRequestConfig = {}) {
    return apiInstance.get<AmountType[]>(`${BASE_API_URL}/amount-types`, config);
  }
}

export default RecipeIngredientService;
