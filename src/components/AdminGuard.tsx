import { withAuthenticationRequired, useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import PageLoader from './PageLoader/PageLoader';
import { ComponentType } from 'react';

interface AdminGuardProps {
  component: ComponentType;
}

export const AdminGuard = ({ component }: AdminGuardProps) => {
  const { user, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  const isAdmin = user && user['arqui-roles']?.includes('admin');

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="page-layout">
        <PageLoader />
      </div>
    ),
  });

  return <Component />;
};