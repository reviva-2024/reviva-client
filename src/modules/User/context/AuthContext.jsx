import React, { createContext, useContext, useEffect, useState } from 'react';
import { logs } from '../../../utils/logs';
import { Style } from '../../../utils/logs';

const AuthContext = createContext();

const getUserData = () => {
  const userLocal = localStorage.getItem('user');
  const userSession = sessionStorage.getItem('user');
  if (userLocal === null) {
    return JSON.parse(userSession);
  }
  return JSON.parse(userLocal);
};

export const AuthProvider = ({ children }) => {
  const login = (data, rememberMe) => {
    logs('AuthContext: login', [data], Style.code);
    if (rememberMe) {
      localStorage.setItem('user', JSON.stringify(data));
    } else {
      sessionStorage.setItem('user', JSON.stringify(data));
    }
  };

  const logout = () => {
    sessionStorage.removeItem('user');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ login, logout, getUserData }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
