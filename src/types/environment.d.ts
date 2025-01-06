declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_SERVER_URL: string;
      NEXT_PUBLIC_STATIC_SERVER_URL: string;
      API_SERVER_URL: string;
      STATIC_SERVER_URL: string;
    }
  }
}
