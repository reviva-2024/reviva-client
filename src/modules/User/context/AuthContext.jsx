import React, { createContext, useContext, useEffect, useState } from 'react';
import { logs } from '../../../utils/logs';
import { Style } from '../../../utils/logs';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (data, rememberMe) => {
    logs('AuthContext: login', [data], Style.code);
    setUser(data);
    if (rememberMe) {
      localStorage.setItem('user', JSON.stringify(data));
    } else {
      sessionStorage.setItem('user', JSON.stringify(data));
    }
  };

  const logout = () => {
    sessionStorage.removeItem('user');
    localStorage.removeItem('user');
    setUser(null);
  };

  return <AuthContext.Provider value={{ login, logout, user }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
