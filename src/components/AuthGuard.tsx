import { withAuthenticationRequired } from "@auth0/auth0-react";
import PageLoader from "./PageLoader/PageLoader";
import { ComponentType } from "react";

interface AuthenticationGuardProps {
  component: ComponentType<any>;
}

export const AuthenticationGuard = ({ component }: AuthenticationGuardProps) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="page-layout">
        <PageLoader />
      </div>
    ),
  });

  return <Component />;
};