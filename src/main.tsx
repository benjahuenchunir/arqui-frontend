import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from "./App";
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';

const domain = import.meta.env.REACT_APP_AUTH0_DOMAIN;
const clientId = import.meta.env.REACT_APP_AUTH0_CLIENT_ID;
const redirectUri = import.meta.env.REACT_APP_AUTH0_CALLBACK_URL;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
    >

    
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </StrictMode>,
)
