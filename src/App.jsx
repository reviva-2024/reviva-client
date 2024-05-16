import React from 'react';
import { AuthProvider } from './modules/User/context/AuthContext';
import { BrowserRouter } from 'react-router-dom';

import { Toaster } from 'sonner';
import Routers from './Routes/Routes';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Toaster richColors />

          <Routers />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
