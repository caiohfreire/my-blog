import { Switch } from "@nextui-org/react";
import { IoMdSunny } from "react-icons/io";
import { IoMoon } from "react-icons/io5";
import { useState, useEffect } from 'react';

export default function Toggle() {
  const savedTheme = localStorage.getItem('Theme') || 'light';
  const [theme, setTheme] = useState(savedTheme);

  useEffect(() => {
    applyTheme(savedTheme);
  }, [savedTheme]);

  const applyTheme = (newTheme: string) => {
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    setTheme(newTheme);
    localStorage.setItem('Theme', newTheme);
  };

  return (
    <Switch
      defaultSelected={savedTheme === 'dark'}
      size="md"
      color="warning"
      startContent={<IoMdSunny />}
      endContent={<IoMoon />}
      className="dark"
      onChange={toggleTheme}
    />
  );
}