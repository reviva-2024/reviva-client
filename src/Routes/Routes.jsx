import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Auth from '../modules/User/Pages/Auth/Auth';
import UpdateProfile from '../modules/User/Pages/UpdateProfile/UpdateProfile';

import { useAuth } from '../modules/User/context/AuthContext';
import CurrentProfile from '../modules/User/Pages/UpdateProfile/CurrentProfile';

const Routers = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route exact path="/auth" element={!user ? <Auth /> : <Navigate to={'/'} />} />
      <Route
        exact
        path="/"
        element={
          user ? (
            <div className="flex w-full gap-6">
              {/* Copy this div and return it from Home.jsx */}
              <Outlet />
            </div>
          ) : (
            <Navigate to={'/auth'} />
          )
        }
      >
        <Route exact path="auth/update" element={<UpdateProfile />} />
        <Route exact path="auth/profile" element={<CurrentProfile user={user} />} />
      </Route>
    </Routes>
  );
};

export default Routers;

