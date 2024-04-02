declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_BASE_API_URL: string;
      NEXT_STATIC_SERVER_URL: string;
    }
  }
}
