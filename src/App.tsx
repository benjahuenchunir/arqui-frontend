import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './views/home/Home';
import SignIn from './views/signin/SignIn';
import SignUp from './views/signup/SignUp';
import NotFound from './views/notfound/NotFound';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;