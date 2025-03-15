import { AxiosInstance, AxiosRequestConfig } from 'axios';

import { TokenResponseDto, UserDto, UserRegistryDto } from '@/types';

class AuthService {
  constructor(
    private readonly apiInstance: AxiosInstance,
    private readonly baseApiUrl: string,
  ) {}

  login(email: string, password: string, config?: AxiosRequestConfig) {
    return this.apiInstance.post<TokenResponseDto>(
      `${this.baseApiUrl}/login`,
      {
        email,
        password,
      },
      config,
    );
  }

  createUser(dto: UserRegistryDto, config?: AxiosRequestConfig) {
    return this.apiInstance.post<UserDto>(`${this.baseApiUrl}/signup`, dto, config);
  }

  sendConfirmationEmail(email: string, config?: AxiosRequestConfig) {
    return this.apiInstance.post(`${this.baseApiUrl}/confirmation-email`, { email }, config);
  }

  checkAccessToken(config?: AxiosRequestConfig) {
    return this.apiInstance.get<{ message: 'OK' }>(`${this.baseApiUrl}/check-token`, config);
  }

  validateConfirmationToken(token: string, config?: AxiosRequestConfig) {
    return this.apiInstance.get<{
      message: 'EMAIL_VERIFIED';
    }>(`${this.baseApiUrl}/confirmation-email/${token}`, config);
  }
}

export default AuthService;
