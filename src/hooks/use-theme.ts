
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
    
    // Apply theme to the admin section
    const adminElement = document.getElementById('admin-container');
    if (adminElement) {
      if (theme === 'dark') {
        adminElement.classList.add('dark-mode');
      } else {
        adminElement.classList.remove('dark-mode');
      }
    }
    
    // Add theme classes to body for global styling
    if (theme === 'dark') {
      document.body.classList.add('admin-dark-mode');
    } else {
      document.body.classList.remove('admin-dark-mode');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return { theme, setTheme, toggleTheme };
};
