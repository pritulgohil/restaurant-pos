"use client";

import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setLoggedInUser(storedUser);
    } else {
      // If no user, ensure that loggedInUser is null
      setLoggedInUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
