import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "../LoginButton";
import { LogoutButton } from "../LogoutButton";
import { SignupButton } from "../SignUpButton";
import { Link } from "react-router-dom";

export const NavBarButtons = () => {
    const { isAuthenticated } = useAuth0();

    return (
        <div className="nav-bar__buttons d-flex align-items-center">
            {!isAuthenticated && (
                <>
                    <SignupButton />
                    <LoginButton />
                </>
            )}
            {isAuthenticated && (
                <>
                    <Link className="nav-link" to="/wallet">
                        Wallet
                    </Link>
                    <Link className="nav-link" to="/profile">
                        Profile
                    </Link>
                    <LogoutButton />
                </>
            )}
        </div>
    );
};