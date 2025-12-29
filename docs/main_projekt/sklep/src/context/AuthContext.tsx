import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

import type { User } from "../types/User";
import { fetchMe } from "../utils/auth";

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => void;
  login: (token: string) => void;
}

// Tworzymy kontekst
// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider (komponent React)
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Funkcja logowania
  const login = async (token: string) => {
    // zapis tokenu
    localStorage.setItem("token", token);
    try {
      const u = await fetchMe(); // pobiera dane użytkownika z tokenem
      setUser(u);
    } catch (err) {
      console.error("Nie udało się pobrać danych użytkownika:", err);
      setUser(null);
    }
  };

  // Funkcja wylogowania
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // Przy ładowaniu strony sprawdzamy token
  useEffect(() => {
    const loadUser = async () => {
      try {
        const u = await fetchMe();
        setUser(u);
      } catch (err) {
        console.error("Nie udało się pobrać danych użytkownika:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};
