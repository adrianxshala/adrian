"use client";

import { createContext, useState, useEffect, ReactNode } from "react";

// Define the type for the context value
type AuthContextType = {
  user: any; // Replace `any` with the actual type of your user object
  setUser: (user: any) => void;
  logout: () => Promise<void>; // ✅ Shto logout
};

// Create the context with the correct type
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null); // Replace `any` with the actual type of your user object

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:1911/api/auth/me", { credentials: "include" });
        if (res.ok) {
          const data = await res.json();
          console.log("User data from /api/auth/me:", data);
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        setUser(null);
      }
    };
    checkAuth();
  }, []);

  // ✅ Logout function
  const logout = async () => {
    try {
      await fetch("http://localhost:1911/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setUser(null); // Hiq userin pas logout
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
