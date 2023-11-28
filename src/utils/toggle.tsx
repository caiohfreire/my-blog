import { Switch } from "@nextui-org/react";
import { IoMdSunny } from "react-icons/io";
import { IoMoon } from "react-icons/io5";
import { useState, useEffect } from 'react';

export default function Toggle() {
  const savedTheme = localStorage.getItem('Theme') || 'light';
  const [theme, setTheme] = useState(savedTheme);

  useEffect(() => {
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  }, [savedTheme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('Theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('Theme', 'light');
    }
    setTheme(newTheme);
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