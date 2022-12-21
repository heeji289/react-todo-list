import React, { createContext, useContext, useState } from 'react';

const DarkmodeContext = createContext({
  darkMode: false,
  toggleDarkMode: () => {},
});

export function DarkmodeProvider({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
    updateDarkmode(!darkMode);
  };

  return (
    <DarkmodeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkmodeContext.Provider>
  );
}

function updateDarkmode(darkMode: boolean) {
  if (darkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

export const useDarkMode = () => useContext(DarkmodeContext);
