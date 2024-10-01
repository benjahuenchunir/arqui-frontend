import { Link } from "react-router-dom";
import { NavBarButtons } from "./NavBarButtons";
import "./NavBar.scss";
import { Typography} from '@mui/material';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#093660' }}>
      <div className="container-fluid header">
        <Link className="navbar-brand" to="/">
          <Typography fontWeight="bold" style={{ fontSize: 36, color: '#E2ECF8' }}> 
            CoolGoat
          </Typography>
        </Link>
        <Link className="navbar-brand" to="/compra">
          <Typography fontWeight="bold" style={{ fontSize: 20, color: 'white' }}> 
            Apostar
          </Typography>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ backgroundColor: '#B1CDEC' }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <NavBarButtons />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;