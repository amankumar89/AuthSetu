import { authApi } from "@/utils/api";
import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";

interface User {
  id: string;
  name: string;
  email: string;
  isVerified: boolean;
  lastLogin: string;
  createdAt: string;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!user);

  const initAuth = async () => {
    try {
      const response = await authApi.getMe();
      if (response.data?.success) {
        setIsAuthenticated(true);
        setUser(response.data.user || response.data);
      }
    } catch {
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authApi.login(email, password);

    if (response.data?.success) {
      await initAuth();
    }
    setUser(response.data.user);
  };

  const register = async (name: string, email: string, password: string) => {
    const response = await authApi.register(name, email, password);
    if (response.data.user) {
      setUser(response.data.user);
    }
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch {
      // Ignore logout errors
    }
    setUser(null);
  };

  const deleteAccount = async () => {
    await authApi.deleteAccount();
    setUser(null);
  };

  const verifyEmail = async (code: string) => {
    await authApi.verifyEmail(code);
    await refreshUser();
  };

  const forgotPassword = async (email: string, clientUrl: string) => {
    await authApi.forgotPassword(email, clientUrl);
  };

  const resetPassword = async (resetToken: string, password: string) => {
    await authApi.resetPassword(resetToken, password);
  };

  const refreshUser = async () => {
    try {
      const response = await authApi.getMe();
      setUser(response.data.user || response.data);
    } catch {
      // Ignore refresh errors
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        login,
        register,
        logout,
        deleteAccount,
        verifyEmail,
        forgotPassword,
        resetPassword,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
