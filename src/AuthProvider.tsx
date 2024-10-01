import { Auth0Provider, AppState } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";

interface Auth0ProviderWithNavigateProps {
  children: ReactNode;
}

interface CustomAppState extends AppState {
  returnTo?: string;
}

export const Auth0ProviderWithNavigate = ({ children }: Auth0ProviderWithNavigateProps) => {
  const navigate = useNavigate();

  const domain = import.meta.env.VITE_AUTH0_DOMAIN as string;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID as string;
  const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL as string;

  const onRedirectCallback = (appState?: AppState) => {
    const customAppState = appState as CustomAppState;
    navigate(customAppState?.returnTo || window.location.pathname);
  };

  if (!(domain && clientId && redirectUri)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};