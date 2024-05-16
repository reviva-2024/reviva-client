import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
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
        element={
          user ? (
            <div className="flex w-full gap-6">
              <aside>Sidebar{/* Add sidebar component here after creating the homepage*/}</aside>
              <Outlet />
            </div>
          ) : (
            <Navigate to={'/auth'} />
          )
        }
      >
        <Route exact path="auth/update" element={<UpdateProfile />} />
      </Route>
    </Routes>
  );
};

export default Routers;
