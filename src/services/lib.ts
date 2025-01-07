import axios from 'axios';
import { getCookie } from 'cookies-next/client';

export const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_SERVER_URL,
});

apiInstance.interceptors.request.use(request => {
  const authToken = getCookie('authToken');

  if (authToken) {
    request.headers.Authorization = `Bearer ${authToken}`;
  }

  return request;
});
