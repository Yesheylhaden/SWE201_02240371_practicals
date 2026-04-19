import React, { createContext, useContext, useState, ReactNode } from 'react';

type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  background:    string;
  surface:       string;
  card:          string;
  text:          string;
  textSecondary: string;
  border:        string;
  accent:        string;
}

interface ThemeContextType {
  mode:   ThemeMode;
  toggle: () => void;
  colors: ThemeColors;
  isDark: boolean;
}

const light: ThemeColors = {
  background:    '#F8F9FB',
  surface:       '#FFFFFF',
  card:          '#FFFFFF',
  text:          '#0A1628',
  textSecondary: '#6B7280',
  border:        '#E8ECF4',
  accent:        '#E8A020',
};

const dark: ThemeColors = {
  background:    '#0A0F1E',
  surface:       '#111827',
  card:          '#1A2235',
  text:          '#F0F4FF',
  textSecondary: '#8B95A8',
  border:        '#253047',
  accent:        '#E8A020',
};

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light', toggle: () => {}, colors: light, isDark: false,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>('light');
  const toggle = () => setMode((p) => (p === 'light' ? 'dark' : 'light'));
  return (
    <ThemeContext.Provider value={{ mode, toggle, colors: mode === 'dark' ? dark : light, isDark: mode === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
