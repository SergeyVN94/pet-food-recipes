import axios from 'axios';

import { store } from '@/providers/StoreProvider';
import { TokenResponseDto } from '@/types';

export const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER_URL,
});

apiInstance.interceptors.request.use(request => {
  if (typeof window === 'undefined') {
    return request;
  }

  const authToken = localStorage.getItem('authToken');

  if (authToken) {
    request.headers.Authorization = `Bearer ${authToken}`;
  }

  return request;
});

apiInstance.interceptors.response.use(
  response => response,
  async error => {
    if (typeof window === 'undefined') {
      return Promise.reject(error);
    }

    if (!store?.authStore.isAuthenticated) {
      return Promise.reject(error);
    }

    if (error?.response?.status === 401) {
      const refreshToken = store?.authStore.refreshToken;

      if (!refreshToken) {
        return Promise.reject(error);
      }

      try {
        const response = await axios.post<TokenResponseDto>(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/auth/refresh`, undefined, {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        store.authStore.login(response.data.accessToken, response.data.refreshToken);
        return apiInstance.request({
          ...error.config,
          headers: {
            ...error.config.headers,
            Authorization: `Bearer ${response.data.accessToken}`,
          },
        });
      } catch (e) {
        store.authStore.logout();
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  },
);
