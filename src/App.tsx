import './App.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Route, Routes } from "react-router-dom";
import Home from './views/home/Home';
import NotFound from './views/notfound/NotFound';
import Wallet from './views/wallet/Wallet';
import ProcesoDeCompras from './views/listadecompras/ListaDeCompras';
import Compra from './views/compra/Compra';
import Profile from './views/profile/Profile';
import { AuthenticationGuard } from "./components/AuthGuard";
import PageLoader from "./components/PageLoader/PageLoader";
import NavBar from "./components/NavBar";

const App = () => {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="page-layout">
      <NavBar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/compra" element={<Compra />} />
          <Route
            path="/profile"
            element={<AuthenticationGuard component={Profile} />}
          />
          <Route
            path="/wallet"
            element={<AuthenticationGuard component={Wallet} />}
          />
          <Route path="/procesocompra" element={<ProcesoDeCompras />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;