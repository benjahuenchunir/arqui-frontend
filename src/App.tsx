import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from './views/home/Home';
import SignIn from './views/signin/SignIn';
import SignUp from './views/signup/SignUp';
import NotFound from './views/notfound/NotFound';
import Wallet from './views/wallet/Wallet';
import ProcesoDeCompras from './views/listadecompras/ListaDeCompras';
import Compra from './views/compra/Compra';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/compra" element={<Compra />} />
        <Route path="/procesocompra" element={<ProcesoDeCompras />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;