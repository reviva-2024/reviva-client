import { Routes, Route, Navigate } from 'react-router-dom';
import Auth from '../modules/User/Pages/Auth/Auth';
import UpdateProfile from '../modules/User/Pages/UpdateProfile/UpdateProfile';
import Sidebar from '../components/sidebar/sidebar';
import { useAuth } from '../modules/User/context/AuthContext';
import Signin from '../modules/User/Pages/SignIn/SignIn';

// const routes = createBrowserRouter([
//   {
//     path: '/',
//     element: (
//       <Link to="/auth" className="inline-block px-4 py-2 m-16 border rounded-lg">
//         SignIn
//       </Link>
//     ),
//   },
//   {
//     path: '/auth',
//     element: <Auth />,
//   },
//   {
//     path: '/update',
//     element: <UpdateProfile />,
//   },
// ]);

// import React from 'react';
// import { useAuth } from '../modules/User/context/AuthContext';
// import Signin from '../modules/User/Pages/SignIn/SignIn';

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
