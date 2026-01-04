"use client";

import { createContext, useState, useContext, useEffect } from "react";
import { fetchUser } from "@/services/UserService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [user, setUser] = useState({ firstname: "", lastname: "", email: "" });

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setLoggedInUser(storedUser);
    } else {
      // If no user, ensure that loggedInUser is null
      setLoggedInUser(null);
    }
  }, []);

  const refreshUser = async () => {
    if (!loggedInUser) return;
    const token = localStorage.getItem("token");
    try {
      const data = await fetchUser(loggedInUser, token);
      setUser({
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
      });
      return data;
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{ loggedInUser, setLoggedInUser, user, setUser, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
