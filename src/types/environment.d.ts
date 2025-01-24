declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_SERVER_URL: string;
      NEXT_PUBLIC_STATIC_SERVER_URL: string;
      NEXT_PUBLIC_YANDEX_METRIKA_ID: string;
      API_SERVER_URL: string;
      STATIC_SERVER_URL: string;
    }
  }
}
