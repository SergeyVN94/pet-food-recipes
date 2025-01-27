import { AxiosRequestConfig } from 'axios';

import { UserDto } from '@/types';

import { apiInstance } from './lib';

const BASE_API_URL = '/api/v1/user';

class UserService {
  static getUser(id: UserDto['id'] = '', config?: AxiosRequestConfig) {
    return apiInstance.get<UserDto>(`${BASE_API_URL}/${id}`, config);
  }
}

export default UserService;
