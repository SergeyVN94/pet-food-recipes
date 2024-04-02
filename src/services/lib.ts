import axios from 'axios';

export const apiInstance = axios.create({
  baseURL: process.env.NEXT_BASE_API_URL,
});
