import { AxiosRequestConfig } from 'axios';

import { AmountTypeDto, IngredientDto } from '@/types';

import { apiInstance } from './lib';

const BASE_API_URL = '/api/v1/ingredients';

class IngredientsService {
  static getIngredients(config: AxiosRequestConfig = {}) {
    return apiInstance.get<IngredientDto[]>(`${BASE_API_URL}`, config);
  }

  static getAmountTypes(config: AxiosRequestConfig = {}) {
    return apiInstance.get<AmountTypeDto[]>(`${BASE_API_URL}/amount-types`, config);
  }
}

export default IngredientsService;
