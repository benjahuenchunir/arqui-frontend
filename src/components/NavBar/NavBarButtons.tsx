import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "../LoginButton";
import { LogoutButton } from "../LogoutButton";
import { SignupButton } from "../SignUpButton";
import { Link } from "react-router-dom";

export const NavBarButtons = () => {
    const { user, isAuthenticated } = useAuth0();

    const isAdmin = user && user['arqui-roles']?.includes('admin');

    return (
        <div className="nav-bar__buttons d-flex align-items-center ms-auto">
            {!isAuthenticated && (
                <>
                    <SignupButton />
                    <LoginButton />
                </>
            )}
            {isAuthenticated && (
                <>
                    {isAdmin && (
                        <Link className="nav-link" to="/admin" style={{ fontSize: 20, color: 'white', marginRight: '20px', marginLeft: '10px' }}>
                            Admin Dashboard
                        </Link>
                    )}
                    <Link className="nav-link" to="/procesocompra" style={{ fontSize: 20, color: 'white', marginRight: '20px', marginLeft: '10px' }}>
                        Mis Apuestas
                    </Link>
                    <Link className="nav-link" to="/wallet" style={{ fontSize: 20, color: 'white', marginRight: '20px', marginLeft: '10px' }}>
                        Wallet
                    </Link>
                    <Link className="nav-link" to="/profile" style={{ fontSize: 20, color: 'white', marginRight: '20px', marginLeft: '10px' }}>
                        Profile
                    </Link>
                    <LogoutButton />
                </>
            )}
        </div>
    );
};