declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_SERVER_URL: string;
      NEXT_PUBLIC_STATIC_SERVER_URL: string;
      NEXT_PUBLIC_YANDEX_METRIKA_ID: string;
      NEXT_PUBLIC_BUCKET: string;
    }
  }
}
