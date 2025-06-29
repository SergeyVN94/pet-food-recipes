import { AxiosInstance, AxiosRequestConfig } from 'axios';

import { RecipeCreateDto, RecipeEntity, RecipeFilter, RecipeImageDto, RecipeUpdateDto } from '@/types';

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

  getNewImages(config: AxiosRequestConfig = {}) {
    return this.apiInstance.get<RecipeImageDto[]>(`${this.baseApiUrl}/image/new`, config);
  }

  uploadImage(file: File, recipeId?: RecipeEntity['id'], config: AxiosRequestConfig = {}) {
    const formData = new FormData();
    formData.append('image', file);
    return this.apiInstance.post(`${this.baseApiUrl}/${recipeId ? `${recipeId}/` : ''}image`, formData, config);
  }

  deleteImage(id: RecipeImageDto['id'], config: AxiosRequestConfig = {}) {
    return this.apiInstance.delete<RecipeImageDto>(`${this.baseApiUrl}/image/${id}`, config);
  }
}

export default RecipesService;
