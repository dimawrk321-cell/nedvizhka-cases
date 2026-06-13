/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Публичный URL обработчика заявок (Cloud Function). */
  readonly PUBLIC_LEAD_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
