import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import { useEffect } from "react";
import { Fade } from '@mui/material';

function Profile() {
  const { user } = useAuth0();

  const BACKEND_PROTOCOL = import.meta.env.VITE_BACKEND_PROTOCOL as string;
  const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST as string;

  useEffect(() => {
    const sendSignupData = async () => {
      if (user) {
        // TODO this would ideally be a post signup trigger but this is easier
        const backendUrl = `${BACKEND_PROTOCOL}://${BACKEND_HOST}/signup`;

        try {
          await axios.post(backendUrl, { id: user.sub, email: user.email });
          console.log('Successfully sent signup data to backend');
        } catch (error) {
          console.error('Error sending signup data to backend:', error);
        }
      }
    };

    void sendSignupData();
  }, [user, BACKEND_PROTOCOL, BACKEND_HOST]);

  if (!user) {
    return null;
  }

  return (
    <Fade in={true} timeout={1000}>
      <div className="content-layout" style={{ textAlign: 'center', padding: '10px 0', backgroundColor: '#0a1e31', color: 'white' }}>
        <h1 id="page-title" className="content__title" style={{ fontWeight: 700, color: "#B1CDEC", marginBottom: "50px" }}>
          Tu Perfil
        </h1>
        <div className="content__body" style={{ display: "flex", alignItems: "center" }}>
          <div className="profile-grid" style={{ backgroundColor: "#093660", maxWidth: "50%", padding: "20px 20px", borderRadius: "20px", border: "2px solid white", margin: "0 auto" }}>
            <div className="profile__header">
              <img
                src={user.picture}
                alt="Profile"
                className="profile__avatar"
                style={{ borderRadius: '50px', marginBottom: "50px" }}
              />
              <div className="profile__headline" style={{ textAlign: "left" }}>
                <p className="profile__title" style={{ marginBottom: "50px", fontSize: "30px" }}>
                  <strong>Nombre:</strong> {user.name}
                  <strong>Nombre:</strong> {user.sub}
                </p>
                <p className="profile__description" style={{ marginBottom: "50px", fontSize: "30px" }}>
                  <strong> Mail: </strong> {user.email}
                </p>
              </div>
            </div>
            <div className="profile__details">
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
}

export default Profile;