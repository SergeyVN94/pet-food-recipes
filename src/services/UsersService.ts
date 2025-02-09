import { AxiosRequestConfig } from 'axios';

import { UserDto } from '@/types';

import { apiInstance } from './lib';

const BASE_API_URL = '/api/v1/users';

class UsersService {
  static getUser(id: UserDto['id'] = '', config?: AxiosRequestConfig) {
    return apiInstance.get<UserDto>(`${BASE_API_URL}/user/${id}`, config);
  }
}

export default UsersService;
