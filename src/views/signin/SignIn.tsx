
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const SignIn: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={() => loginWithRedirect()}>Log In with Auth0</button>
    </div>
  );
};

export default SignIn;
