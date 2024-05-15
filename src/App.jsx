import React from 'react';
import { AuthProvider } from './modules/User/context/AuthContext';
import { RouterProvider } from 'react-router-dom';
import routes from './Routes/Routes';
import { Toaster } from 'sonner';

const App = () => {
  return (
    <AuthProvider>
      <Toaster richColors />
      <RouterProvider router={routes}></RouterProvider>
    </AuthProvider>
  );
};

export default App;
