import { AxiosInstance, AxiosRequestConfig } from 'axios';

import { UserDto } from '@/types';
import { BookmarkCreateDto, BookmarkDto, BookmarkRecipeEntity } from '@/types/bookmarks';

class BookmarksService {
  constructor(
    private readonly apiInstance: AxiosInstance,
    private readonly baseApiUrl: string,
  ) {}

  getBookmarks(userId?: UserDto['id'], config: AxiosRequestConfig = {}) {
    return this.apiInstance.get<BookmarkDto[]>(userId ? `${this.baseApiUrl}/user/${userId}` : `${this.baseApiUrl}`, config);
  }

  createBookmark(dto: BookmarkCreateDto, config: AxiosRequestConfig = {}) {
    return this.apiInstance.post<BookmarkDto>(`${this.baseApiUrl}`, dto, config);
  }

  updateBookmark(bookmarkId: string, dto: BookmarkCreateDto, config: AxiosRequestConfig = {}) {
    return this.apiInstance.patch<BookmarkDto>(`${this.baseApiUrl}/${bookmarkId}`, dto, config);
  }

  deleteBookmark(bookmarkId: string, config: AxiosRequestConfig = {}) {
    return this.apiInstance.delete<BookmarkDto>(`${this.baseApiUrl}/${bookmarkId}`, config);
  }

  getRecipesInBookmarks(userId?: UserDto['id'], config: AxiosRequestConfig = {}) {
    return this.apiInstance.get<BookmarkRecipeEntity[]>(
      userId ? `${this.baseApiUrl}/recipes/user/${userId}` : `${this.baseApiUrl}/recipes`,
      config,
    );
  }

  addRecipeToBookmark(recipeId: string, bookmarkId: string, config: AxiosRequestConfig = {}) {
    return this.apiInstance.patch<BookmarkRecipeEntity>(`${this.baseApiUrl}/${bookmarkId}/recipes/${recipeId}`, config);
  }

  removeRecipeFromBookmark(recipeId: string, config: AxiosRequestConfig = {}) {
    return this.apiInstance.delete(`${this.baseApiUrl}/recipes/${recipeId}`, config);
  }
}

export default BookmarksService;
