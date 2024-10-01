import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import { useEffect } from "react";

function Profile() {
  const { user } = useAuth0();

  if (!user) {
    return null;
  }

  const BACKEND_PROTOCOL = import.meta.env.VITE_BACKEND_PROTOCOL
  const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST

  useEffect(() => {
    // TODO this would ideally be a post signup trigger but this is easier
    const backendUrl = `${BACKEND_PROTOCOL}://${BACKEND_HOST}/signup`;

    axios.post(backendUrl, { id: user.sub, email: user.email })
      .then(() => {
        console.log('Successfully sent signup data to backend');
      })
      .catch(error => {
        console.error('Error sending signup data to backend:', error);
      });
  });

  return (
      <div className="content-layout">
        <h1 id="page-title" className="content__title">
          Profile Page
        </h1>
        <div className="content__body">
          <p id="page-description">
            <span>
              You can use the <strong>ID Token</strong> to get the profile
              information of an authenticated user.
            </span>
          </p>
          <div className="profile-grid">
            <div className="profile__header">
              <img
                src={user.picture}
                alt="Profile"
                className="profile__avatar"
              />
              <div className="profile__headline">
                <h2 className="profile__title">{user.name}</h2>
                <span className="profile__description">{user.email}</span>
              </div>
            </div>
            <div className="profile__details">
            </div>
          </div>
        </div>
      </div>
  );
};

export default Profile;