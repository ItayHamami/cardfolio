// DarkModeContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface DarkModeContextType {
  isDark: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export const DarkModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    const [isDark, setIsDark] = useState(savedDarkMode);

    const toggleDarkMode = () => {
    setIsDark(prevIsDark => !prevIsDark);
    localStorage.setItem('darkMode', JSON.stringify(!isDark));
    };
    useEffect(() => {
    if (isDark) {
        document.body.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
    }
    }, [isDark]);
    return (
    <DarkModeContext.Provider value={{ isDark, toggleDarkMode }}>
        {children}
    </DarkModeContext.Provider>
    );
};

export const useDarkMode = (): DarkModeContextType => {
const context = useContext(DarkModeContext);
if (!context) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
}
return context;
};
