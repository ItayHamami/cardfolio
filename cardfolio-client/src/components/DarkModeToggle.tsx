import React from "react";
import { useDarkMode } from "../components/DarkModeContext";

export const DarkModeToggle = () => {
  const { isDark, toggleDarkMode } = useDarkMode();

  const handleToggle = () => {
    toggleDarkMode(); // Update the state first
    localStorage.setItem("darkMode", JSON.stringify(!isDark)); // Then update local storage
  };

  return (
    <button type="button" id="toggler"
      onClick={handleToggle}
      className={`toggle-button ${isDark ? "dark" : "light"}`}
      aria-label="Dark mode toggle"
    >
      {isDark ? "🌙" : "🔆"}
    </button>
  );
};
