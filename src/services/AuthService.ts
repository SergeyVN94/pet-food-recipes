import { AxiosRequestConfig } from 'axios';

import { TokenResponseDto, UserDto, UserRegistryDto } from '@/types';

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

  static createUser(dto: UserRegistryDto, config?: AxiosRequestConfig) {
    return apiInstance.post<UserDto>(`${BASE_API_URL}/signup`, dto, config);
  }

  static sendConfirmationEmail(email: string, config?: AxiosRequestConfig) {
    return apiInstance.post(`${BASE_API_URL}/confirmation-email`, { email }, config);
  }

  static checkAccessToken(config?: AxiosRequestConfig) {
    return apiInstance.get<{ message: 'OK' }>(`${BASE_API_URL}/check-token`, config);
  }

  static validateConfirmationToken(token: string, config?: AxiosRequestConfig) {
    return apiInstance.get<{
      message: 'EMAIL_VERIFIED';
    }>(`${BASE_API_URL}/confirmation-email/${token}`, config);
  }
}

export default AuthService;
