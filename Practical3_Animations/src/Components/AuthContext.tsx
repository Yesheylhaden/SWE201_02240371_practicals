import React, { createContext, useContext, useState } from "react";

interface User {
  id: string;
  name: string;
}

interface AuthContextValue {
  user: User | null; // null if not authenticated
  login: (user: User) => void;
  isLogin: boolean;
  logout: () => void;
}

// Step 1: Create the context with an undefined default value
export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

// Step 2: Create the provider component with state management and authentication logic
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLogin, setIsLogin] = useState(false);

  const login = (newUser: User) => {
    setUser(newUser);
    setIsLogin(true);
  };

  const logout = () => {
    setUser(null);
    setIsLogin(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, isLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Step 3: Create a custom hook to consume the context, ensuring it's used within the provider
export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
};