import { Link, createBrowserRouter } from 'react-router-dom';
import Auth from '../modules/User/Pages/Auth/Auth';
import UpdateProfile from '../modules/User/Pages/UpdateProfile/UpdateProfile';
import Sidebar from '../components/sidebar/sidebar';

const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <Link to="/auth" className="inline-block px-4 py-2 m-16 border rounded-lg">
        SignIn
      </Link>
    ),
  },
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '/update',
    element: <UpdateProfile />,
  },
  {
    path: '/sidebar',
    element: <Sidebar />,
  },
]);

export default routes;
