import './App.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth0 } from "@auth0/auth0-react";
import { Route, Routes } from "react-router-dom";
import Home from './views/home/Home';
import NotFound from './views/notfound/NotFound';
import Wallet from './views/wallet/Wallet';
import ProcesoDeCompras from './views/misrequests/MisRequests';
import Compra from './views/compra/Compra';
import Profile from './views/profile/Profile';
import { AuthenticationGuard } from "./components/AuthGuard";
import PageLoader from "./components/PageLoader/PageLoader";
import NavBar from "./components/NavBar/NavBar";
import ConfirmPurchase from "./views/compra/ConfirmarCompra";
import PurchaseCompleted from "./views/compra/PurchaseCompleted";
import Modal from './components/Modal/Modal';
import Dashboard from './views/admin/Dashboard';
import { AdminGuard } from './components/AdminGuard';

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
          <Route
            path="/compra"
            element={<AuthenticationGuard component={Compra} />}
          />
          <Route
            path="/profile"
            element={<AuthenticationGuard component={Profile} />}
          />
          <Route
            path="/wallet"
            element={<AuthenticationGuard component={Wallet} />}
          />
          <Route path="/procesocompra" element={<ProcesoDeCompras />} />
          <Route path="/confirm-purchase" element={<ConfirmPurchase />} />
          <Route path="/completed-purchase" element={<PurchaseCompleted />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/admin" element={<AdminGuard component={Dashboard} />} />
        </Routes>
      </div>
      <Modal />
    </div>
  );
};

export default App;