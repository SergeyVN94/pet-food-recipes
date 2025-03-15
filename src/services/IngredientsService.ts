import { AxiosInstance, AxiosRequestConfig } from 'axios';

import { AmountTypeDto, IngredientDto } from '@/types';

class IngredientsService {
  constructor(
    private readonly apiInstance: AxiosInstance,
    private readonly baseApiUrl: string,
  ) {}

  getIngredients(config: AxiosRequestConfig = {}) {
    return this.apiInstance.get<IngredientDto[]>(`${this.baseApiUrl}`, config);
  }

  getAmountTypes(config: AxiosRequestConfig = {}) {
    return this.apiInstance.get<AmountTypeDto[]>(`${this.baseApiUrl}/amount-types`, config);
  }
}

export default IngredientsService;
