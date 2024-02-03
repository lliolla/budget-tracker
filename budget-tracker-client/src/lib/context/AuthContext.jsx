// authContext.js

import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Vérifier l'authentification ici (utilisez votre logique existante)
    const checkAuthentication = async () => {
      // ... votre logique d'authentification

      // Exemple : vérifiez si un token est présent dans le local storage
      const token = localStorage.getItem('token');
      const authenticated = token ? true : false;

      setIsAuthenticated(authenticated);
    };

    checkAuthentication();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
