import { AxiosRequestConfig } from 'axios';

import { TokenResponseDto } from '@/types';

import { apiInstance } from './lib';

const BASE_API_URL = '/api/v1/auth';

class AuthService {
  static login(email: string, password: string, config?: AxiosRequestConfig) {
    return apiInstance.post<TokenResponseDto>(
      `${BASE_API_URL}/login`,
      {
        email,
        password,
      },
      config,
    );
  }
}

export default AuthService;
