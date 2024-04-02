import axios from 'axios';

export const apiInstance = axios.create({
  baseURL: process.env.NEXT_API_SERVER_URL,
});
