import { createContext, useContext, useEffect, useState } from "react";

interface IDarkModeProps {
  savedTheme: any;
  theme: any;
  setTheme: any;
  toggleTheme: () => void;
}

const DarkModeContext = createContext<IDarkModeProps | undefined>(undefined);

export const DarkModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const savedTheme = localStorage.getItem('Theme') || 'light';
  const [theme, setTheme] = useState(savedTheme);

  const applyTheme = (newTheme: string) => {
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.style.background = '#000';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.background = '#FFF';
    }
  };

  useEffect(() => {
    applyTheme(savedTheme);
  }, [savedTheme]);

  if (!localStorage.getItem('Theme')) {
    localStorage.setItem('Theme', 'dark');
    applyTheme('dark');
  }

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    console.log('tema atual', newTheme);
    applyTheme(newTheme);
    console.log('tema aplicado', applyTheme);
    setTheme(newTheme);
    localStorage.setItem('Theme', newTheme);
  };

  return (
    <DarkModeContext.Provider value={{ savedTheme, theme, setTheme, toggleTheme }}>
      {children}
    </DarkModeContext.Provider>
  )
}

export const useDarkModeContext = () => {
  const context = useContext(DarkModeContext);
  if (!context) {
    throw new Error('useDarkModeContext deve ser usado dentro de um DarkModeProvider');
  }
  return context;
};