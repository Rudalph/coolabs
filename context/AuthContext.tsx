"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "@/database/firebase";
import { onAuthStateChanged, User, setPersistence, browserLocalPersistence } from "firebase/auth";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        console.log("Setting Firebase persistence...");
        await setPersistence(auth, browserLocalPersistence);

        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
          console.log("Auth state changed: ", firebaseUser);
          setUser(firebaseUser);
          setLoading(false);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Error setting persistence:", error);
        setLoading(false);
      }
    };

    fetchAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
