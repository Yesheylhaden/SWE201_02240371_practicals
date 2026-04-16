import React, { createContext, useContext, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────
export type Theme = 'light' | 'dark';

export type Colors = {
  background: string;
  surface: string;
  card: string;
  text: string;
  subtext: string;
  border: string;
  primary: string;
  primaryText: string;
  danger: string;
  success: string;
  badge_low: string;
  badge_normal: string;
  badge_high: string;
};

type ThemeContextValue = {
  theme: Theme;
  toggleTheme: () => void;
  colors: Colors;
};

// ─── Colour Palettes ──────────────────────────────────────────────────────────
const COLORS: Record<Theme, Colors> = {
  light: {
    background:   '#F0F4F8',
    surface:      '#FFFFFF',
    card:         '#FFFFFF',
    text:         '#1A1A2E',
    subtext:      '#6B7280',
    border:       '#E5E7EB',
    primary:      '#1E6FBB',
    primaryText:  '#FFFFFF',
    danger:       '#EF4444',
    success:      '#10B981',
    badge_low:    '#D1FAE5',
    badge_normal: '#DBEAFE',
    badge_high:   '#FEE2E2',
  },
  dark: {
    background:   '#0F172A',
    surface:      '#1E293B',
    card:         '#1E293B',
    text:         '#F1F5F9',
    subtext:      '#94A3B8',
    border:       '#334155',
    primary:      '#3B82F6',
    primaryText:  '#FFFFFF',
    danger:       '#F87171',
    success:      '#34D399',
    badge_low:    '#064E3B',
    badge_normal: '#1E3A5F',
    badge_high:   '#7F1D1D',
  },
};

// ─── Context ──────────────────────────────────────────────────────────────────
const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors: COLORS[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
}

// ─── Custom Hook ──────────────────────────────────────────────────────────────
export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}
