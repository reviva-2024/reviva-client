import { createBrowserRouter } from 'react-router-dom';
import Auth from '../modules/User/Pages/Auth/Auth';
import UpdateProfile from '../modules/User/Pages/UpdateProfile/UpdateProfile';
import Sidebar from '../components/sidebar/sidebar';

const routes = createBrowserRouter([
  {
    path: '/',
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

