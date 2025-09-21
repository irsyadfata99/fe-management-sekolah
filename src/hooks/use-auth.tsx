// ============================================================================
// 4. FIXED: src/hooks/use-auth.tsx (Frontend Auth Hook)
// ============================================================================

"use client";

import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";
import api, { ApiResponse } from "@/lib/api";
import {
  getToken,
  setToken,
  removeToken,
  getUserFromToken,
  isAuthenticated,
} from "@/lib/auth";

interface User {
  id: number;
  username: string;
  role: string;
  email?: string;
  full_name?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuth: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token && isAuthenticated()) {
      const userData = getUserFromToken(token);
      if (userData) {
        setUser({
          id: userData.id!,
          username: userData.username,
          role: userData.role,
          email: userData.email,
        });
      }
    }
    setLoading(false);
  }, []);

  const login = async (
    username: string,
    password: string
  ): Promise<boolean> => {
    try {
      setLoading(true);

      console.log("Attempting login for:", username);

      const response = await api.post<
        ApiResponse<{ token: string; user: User }>
      >("/api/auth/login", {
        username,
        password,
      });

      console.log("Login response:", response.data);

      if (response.data.success && response.data.data) {
        const { token, user: userData } = response.data.data;

        console.log("Login successful, user data:", userData);

        setToken(token);
        setUser(userData);
        return true;
      } else {
        console.error("Login failed:", response.data.message);
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    isAuth: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
