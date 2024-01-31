declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_API_SERVER: string;
      NEXT_PUBLIC_STATIC_DIR: string;
    }
  }
}
