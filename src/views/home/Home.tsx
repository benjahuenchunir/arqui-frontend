import { Button, Typography, Container } from '@mui/material';
import { Fade } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleVerPartidosClick = () => {
    navigate('/compra');
  };

  return (
    <div id="HomeContainer">
      <Container style={{ textAlign: 'center', padding: '50px 0', backgroundColor: '#0a1e31', color: 'white' }}>
        <Fade in={true} timeout={{ enter: 0, exit: 2000 }}>
          <Typography variant="h1" style={{ fontWeight: 700, color: "#B1CDEC" }}>
            CoolGoat
          </Typography>
        </Fade>
        <Fade in={true} timeout={{ enter: 5000, exit: 3000 }}>
          <Typography variant="body1" style={{ marginTop: '100px', fontSize: 32 }}>
            ¡Apuesta y gana con tus equipos preferidos!
          </Typography>
        </Fade>
        <Fade in={true} timeout={{ enter: 5000, exit: 3000 }}>
          <Button 
            variant="contained" 
            color="primary" 
            style={{ marginTop: '90px', fontSize: 20 }} 
            onClick={handleVerPartidosClick}
          >
            Ver Partidos
          </Button>
        </Fade>
      </Container>
    </div>
  );
}

export default Home;