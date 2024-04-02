declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_API_SERVER_URL: string;
      NEXT_PUBLIC_STATIC_DIR: string;
      NEXT_STATIC_SERVER_URL: string;
    }
  }
}
