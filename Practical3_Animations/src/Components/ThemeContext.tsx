import React, { createContext, useContext, useState } from "react";

export type ThemeType = "dark" | "light";

interface ThemeContextValue {
  theme: ThemeType;
  toggleTheme: () => void;
  colors: {
    background: string;
    card: string;
    text: string;
    textSecondary: string;
    border: string;
    primary: string;
    accent: string;
    error: string;
    success: string;
  };
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(
  undefined,
);

const themes = {
  dark: {
    background: "#121212",
    card: "#1E1E1E",
    text: "#FFFFFF",
    textSecondary: "#AAAAAA",
    border: "#333333",
    primary: "#2b99d0",
    accent: "#4CAF50",
    error: "#F44336",
    success: "#4CAF50",
  },
  light: {
    background: "#FFFFFF",
    card: "#F5F5F5",
    text: "#000000",
    textSecondary: "#666666",
    border: "#DDDDDD",
    primary: "#2b99d0",
    accent: "#4CAF50",
    error: "#F44336",
    success: "#4CAF50",
  },
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<ThemeType>("dark");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        colors: themes[theme],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
};
