/// <reference types="vite/client" />

interface ImportMetaEnv {
    REACT_APP_AUTH0_DOMAIN: string;
    REACT_APP_AUTH0_CLIENT_ID: string;
    REACT_APP_AUTH0_CALLBACK_URL: string;
    REACT_APP_API_SERVER_URL: string; 
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }