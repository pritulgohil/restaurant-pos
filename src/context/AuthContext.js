"use client";

import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState({ user: null });

  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
