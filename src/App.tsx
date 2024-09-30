import './App.scss';
import LoginButton from "./components/LoginButton";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from './views/home/Home';
import SignIn from './views/signin/SignIn';
import SignUp from './views/signup/SignUp';
import NotFound from './views/notfound/NotFound';
import Wallet from './views/wallet/Wallet';
import ProcesoDeCompras from './views/listadecompras/ListaDeCompras';
import Compra from './views/compra/Compra';


const App = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Router>
      <div>
        <Navbar />
        {isAuthenticated ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/compra" element={<Compra />} />
            <Route path="/procesocompra" element={<ProcesoDeCompras />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        ) : (
          <LoginButton />
        )}
      </div>
    </Router>
  );
};

export default App;

// function App() {
//   return (
//     <div className="App">
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/signin" element={<SignIn />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/wallet" element={<Wallet />} />
//         <Route path="/compra" element={<Compra />} />
//         <Route path="/procesocompra" element={<ProcesoDeCompras />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </div>
//   );
// }

// export default App;