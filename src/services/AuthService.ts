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

  register(dto: UserRegistryDto, config?: AxiosRequestConfig) {
    return this.apiInstance.post<UserDto>(`${this.baseApiUrl}/register`, dto, config);
  }

  sendConfirmationEmail(email: string, config?: AxiosRequestConfig) {
    return this.apiInstance.post(`${this.baseApiUrl}/confirmation-email`, { email }, config);
  }

  checkAccessToken(config?: AxiosRequestConfig) {
    return this.apiInstance.post<{ message: 'OK' }>(`${this.baseApiUrl}/check-token`, undefined, config);
  }

  validateConfirmationToken(token: string, config?: AxiosRequestConfig) {
    return this.apiInstance.post<{
      message: 'EMAIL_VERIFIED';
    }>(`${this.baseApiUrl}/confirmation-email/${token}`, undefined, config);
  }
}

export default AuthService;
