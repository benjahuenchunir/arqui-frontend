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
      sx={{ fontSize: '16px', padding: '8px 15px', borderRadius: '10px', backgroundColor: '#041a2f'  }}
    >
      Log Out
    </Button>
  );
};