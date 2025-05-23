
import React, { createContext, useContext, ReactNode } from 'react';
import { useTheme as useThemeHook } from './use-theme';

// Create context
const ThemeContext = createContext<ReturnType<typeof useThemeHook> | undefined>(undefined);

// Provider component
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const themeValues = useThemeHook();
  return <ThemeContext.Provider value={themeValues}>{children}</ThemeContext.Provider>;
};

// Hook for consuming context
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};
