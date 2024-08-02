import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SighUp';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/AuthContext';

function App() {
  const { authUser } = useAuthContext();
  return (
    <>
      <div className="p-4 h-screen flex items-center justify-center">
        <Routes>
          <Route path="/" element={authUser?.user ? <Home /> : <Navigate to={"/login"} /> } />
          <Route
            path="/login"
            element={authUser?.user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={authUser?.user ? <Navigate to="/" /> : <SignUp />}
          />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App
