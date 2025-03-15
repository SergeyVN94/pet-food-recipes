import { AxiosInstance, AxiosRequestConfig } from 'axios';

import { RecipeCreateDto, RecipeEntity, RecipeFilter, RecipeUpdateDto } from '@/types';

class RecipesService {
  constructor(
    private readonly apiInstance: AxiosInstance,
    private readonly baseApiUrl: string,
  ) {}

  getRecipeBySlug(slug: string, config: AxiosRequestConfig = {}) {
    return this.apiInstance.get<RecipeEntity>(`${this.baseApiUrl}/slug/${slug}`, config);
  }

  getRecipeById(id: string, config: AxiosRequestConfig = {}) {
    return this.apiInstance.get<RecipeEntity>(`${this.baseApiUrl}/${id}`, config);
  }

  postRecipesSearch(filter: RecipeFilter = {}, config: AxiosRequestConfig = {}) {
    return this.apiInstance.post<RecipeEntity[]>(`${this.baseApiUrl}/search`, filter, config);
  }

  postRecipe(dto: RecipeCreateDto, config: AxiosRequestConfig = {}) {
    return this.apiInstance.post<RecipeEntity>(`${this.baseApiUrl}`, dto, config);
  }

  patchRecipe(slug: RecipeEntity['slug'], dto: RecipeUpdateDto, config: AxiosRequestConfig = {}) {
    return this.apiInstance.patch<RecipeEntity>(`${this.baseApiUrl}/${slug}`, dto, config);
  }

  deleteRecipe(slug: RecipeEntity['slug'], config: AxiosRequestConfig = {}) {
    return this.apiInstance.delete<RecipeEntity>(`${this.baseApiUrl}/${slug}`, config);
  }

  publishRecipe(slug: RecipeEntity['slug'], config: AxiosRequestConfig = {}) {
    return this.apiInstance.patch<RecipeEntity>(`${this.baseApiUrl}/${slug}/publish`, undefined, config);
  }

  unpublishRecipe(slug: RecipeEntity['slug'], config: AxiosRequestConfig = {}) {
    return this.apiInstance.patch<RecipeEntity>(`${this.baseApiUrl}/${slug}/unpublish`, undefined, config);
  }
}

export default RecipesService;
