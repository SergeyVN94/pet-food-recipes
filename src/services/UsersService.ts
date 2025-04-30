import { AxiosInstance, AxiosRequestConfig } from 'axios';

import { SearchDto, SearchResponseWithPagination, UserDto } from '@/types';

class UsersService {
  constructor(
    private readonly apiInstance: AxiosInstance,
    private readonly baseApiUrl: string,
  ) {}

  getUser(id: UserDto['id'] = '', config?: AxiosRequestConfig) {
    return this.apiInstance.get<UserDto>(`${this.baseApiUrl}/user/${id}`, config);
  }

  findUsers(filters?: SearchDto, config?: AxiosRequestConfig) {
    return this.apiInstance.post<SearchResponseWithPagination<UserDto>>(`${this.baseApiUrl}/search`, filters, config);
  }

  updateAvatar(avatar: File, config?: AxiosRequestConfig) {
    const body = new FormData();
    body.set('avatar', avatar);

    return this.apiInstance.put<string>(`${this.baseApiUrl}/avatar`, body, config);
  }

  deleteAvatar(userId?: UserDto['id'], config?: AxiosRequestConfig) {
    return this.apiInstance.delete(`${this.baseApiUrl}/avatar/${userId ?? ''}`, config);
  }
}

export default UsersService;
