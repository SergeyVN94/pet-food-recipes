import { AxiosRequestConfig } from 'axios';

import { UserDto } from '@/types';
import { BookmarkCreateDto, BookmarkDto, BookmarkRecipeDto } from '@/types/bookmarks';

import { apiInstance } from './lib';

const BASE_API_URL = '/api/v1/bookmarks';

class BookmarksService {
  static getBookmarks(userId?: UserDto['id'], config: AxiosRequestConfig = {}) {
    return apiInstance.get<BookmarkDto[]>(userId ? `${BASE_API_URL}/user/${userId}` : `${BASE_API_URL}`, config);
  }

  static createBookmark(dto: BookmarkCreateDto, config: AxiosRequestConfig = {}) {
    return apiInstance.post<BookmarkDto>(`${BASE_API_URL}`, dto, config);
  }

  static updateBookmark(bookmarkId: string, dto: BookmarkCreateDto, config: AxiosRequestConfig = {}) {
    return apiInstance.patch<BookmarkDto>(`${BASE_API_URL}/${bookmarkId}`, dto, config);
  }

  static deleteBookmark(bookmarkId: string, config: AxiosRequestConfig = {}) {
    return apiInstance.delete<BookmarkDto>(`${BASE_API_URL}/${bookmarkId}`, config);
  }

  static getRecipesInBookmarks(userId?: UserDto['id'], config: AxiosRequestConfig = {}) {
    return apiInstance.get<BookmarkRecipeDto[]>(userId ? `${BASE_API_URL}/recipes/user/${userId}` : `${BASE_API_URL}/recipes`, config);
  }

  static addRecipeToBookmark(recipeId: string, bookmarkId: string, config: AxiosRequestConfig = {}) {
    return apiInstance.get<BookmarkRecipeDto>(`${BASE_API_URL}/${bookmarkId}/recipes/${recipeId}`, config);
  }

  static removeRecipeFromBookmark(recipeId: string, config: AxiosRequestConfig = {}) {
    return apiInstance.delete(`${BASE_API_URL}/recipes/${recipeId}`, config);
  }
}

export default BookmarksService;
