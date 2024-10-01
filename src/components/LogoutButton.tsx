import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";

export const LogoutButton = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <Button
      onClick={handleLogout}
      variant="contained"
      sx={{ fontSize: '1.2rem', padding: '10px 20px', borderRadius: '10px', backgroundColor: '#041a2f'  }}
    >
      Log Out
    </Button>
  );
};