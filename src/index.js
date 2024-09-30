import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { Auth0ProviderWithNavigate } from "./auth0-provider-with-navigate";
import { Auth0Provider } from '@auth0/auth0-react';
import "./styles/styles.css";

const container = document.getElementById("root")!;
const root = createRoot(container);
const domain = import.meta.env.REACT_APP_AUTH0_DOMAIN;
const clientId = import.meta.env.REACT_APP_AUTH0_CLIENT_ID;
const redirectUri = import.meta.env.REACT_APP_AUTH0_CALLBACK_URL;

root.render(
  <React.StrictMode>
    <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: window.location.origin
        }}
    >
      <BrowserRouter>
        <Auth0ProviderWithNavigate>
          <App />
        </Auth0ProviderWithNavigate>
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);