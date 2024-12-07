import { AxiosRequestConfig } from 'axios';

import { UserDto } from '@/types';

import { apiInstance } from './lib';

const BASE_API_URL = '/api/v1/user';

class UserService {
  static getUser(config?: AxiosRequestConfig) {
    return apiInstance.get<UserDto>(`${BASE_API_URL}`, config);
  }
}

export default UserService;
