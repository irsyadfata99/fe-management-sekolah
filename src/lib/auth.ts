// ============================================================================
// 3. FIXED: src/lib/auth.ts (Frontend Auth Utils)
// ============================================================================

import { jwtDecode } from "jwt-decode";

interface JWTPayload {
  id?: number; // Handle both id and userId
  userId?: number; // For compatibility
  username: string;
  role: string;
  email?: string;
  exp: number;
}

const TOKEN_KEY = "auth_token";

export const setToken = (token: string): void => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const removeToken = (): void => {
  localStorage.removeItem(TOKEN_KEY);
};

export const isTokenValid = (token: string): boolean => {
  try {
    const decoded = jwtDecode<JWTPayload>(token);
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

// FIXED: Handle both 'id' and 'userId' structures
export const getUserFromToken = (token: string): JWTPayload | null => {
  try {
    const decoded = jwtDecode<JWTPayload>(token);

    // Ensure we have a valid user ID
    const id = decoded.id || decoded.userId;
    if (!id) {
      console.error("No user ID found in token");
      return null;
    }

    // Return normalized structure
    return {
      id,
      username: decoded.username,
      role: decoded.role,
      email: decoded.email || "",
      exp: decoded.exp,
    };
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  const token = getToken();
  return token ? isTokenValid(token) : false;
};
