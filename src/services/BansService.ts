import { AxiosInstance, AxiosRequestConfig } from 'axios';

import { BanCreateDto, BanDto, UserDto } from '@/types';

class BansService {
  constructor(
    private readonly apiInstance: AxiosInstance,
    private readonly baseApiUrl: string,
  ) {}

  ban(userId: UserDto['id'], dto: BanCreateDto, config?: AxiosRequestConfig) {
    return this.apiInstance.post<BanDto>(`${this.baseApiUrl}/${userId}`, dto, config);
  }

  deleteBan(userId: UserDto['id'], config?: AxiosRequestConfig) {
    return this.apiInstance.delete<BanDto>(`${this.baseApiUrl}/${userId}`, config);
  }
}

export default BansService;
