import { Routes, Route, Navigate } from 'react-router-dom';
import Auth from '../modules/User/Pages/Auth/Auth';
import UpdateProfile from '../modules/User/Pages/UpdateProfile/UpdateProfile';
import { useAuth } from '../modules/User/context/AuthContext';
import Quiz from '../modules/Quiz/pages/Quiz';
import Home from '../pages/Home';

const Routers = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route exact path="/auth" element={!user ? <Auth /> : <Navigate to={'/'} />} />
      <Route exact path="/" element={user ? <Home /> : <Navigate to={'/auth'} />}>
        <Route exact path="auth/update" element={<UpdateProfile />} />
        <Route exact path="quiz" element={<Quiz />} />
      </Route>
    </Routes>
  );
};

export default Routers;
