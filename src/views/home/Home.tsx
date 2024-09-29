import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import LogInButton from '../../components/LogInButton';
import LogOutButton from '../../components/LogOutButton';

const Home: React.FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth0();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;  // Muestra "Loading..." mientras se verifica el estado de Auth0
  }

  return (
    <div id="HomeContainer">
      <h1>Bienvenido a la página de inicio</h1>
      <p>Este es el texto de prueba para el despliegue</p>

      {isAuthenticated ? (
        <>
          <h2>Hola, {user?.name}</h2>
          <LogOutButton />
        </>
      ) : (
        <>
          <p>No estás autenticado.</p>
          <LogInButton />
        </>
      )}

      <div>
        <button onClick={() => navigate('/signin')}>Ir a Sign In</button>
        <button onClick={() => navigate('/signup')}>Ir a Sign Up</button>
      </div>
    </div>
  );
};

export default Home;
