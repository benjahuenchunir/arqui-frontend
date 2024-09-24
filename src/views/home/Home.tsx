import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div id="HomeContainer">
      <h1>Home</h1>
      <button onClick={() => navigate('/signin')}>Go to Sign In</button>
      <button onClick={() => navigate('/signup')}>Go to Sign Up</button>
    </div>
  );
}

export default Home;