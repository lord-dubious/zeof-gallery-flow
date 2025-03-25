
import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('admin-theme') as Theme | null;
    
    // If not in localStorage, check system preference
    if (!savedTheme) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    return savedTheme || 'light';
  });

  useEffect(() => {
    localStorage.setItem('admin-theme', theme);
    
    // Apply theme to the body for global styling
    if (theme === 'dark') {
      document.body.classList.add('admin-dark-mode');
      document.documentElement.classList.add('dark');
    } else {
      document.body.classList.remove('admin-dark-mode');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return { theme, setTheme, toggleTheme };
};
