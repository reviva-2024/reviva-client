import { Routes, Route, Navigate } from 'react-router-dom';
import Auth from '../modules/User/Pages/Auth/Auth';
import UpdateProfile from '../modules/User/Pages/UpdateProfile/UpdateProfile';
import { useAuth } from '../modules/User/context/AuthContext';

const Routers = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route exact path="/auth" element={!user ? <Auth /> : <Navigate to={'/'} />} />
      <Route
        exact
        path="/"
        element={user ? <div className="text-black">Home</div> : <Navigate to={'/auth'} />}
      >
        <Route path="/update" element={<UpdateProfile />} />
      </Route>
    </Routes>
  );
};

export default Routers;
