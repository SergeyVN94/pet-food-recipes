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
}

export default UsersService;
