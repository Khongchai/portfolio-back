declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_HOST: string;
    DATABASE_PASSWORD: string;
    DATABASE_USERNAME: string;
    DATABASE_NAME: string;
    DATABASE_PORT: number;
    PORT: number;
    SESSION_SECRET: string;
  }
}
