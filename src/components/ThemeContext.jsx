import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

const mq = window.matchMedia("(prefers-color-scheme: dark)");

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem("ss-theme");
    return saved === "dark" || saved === "light" ? saved : "light";
  });
  const [systemDark, setSystemDark] = useState(mq.matches);

  // Listen to real-time system brightness/theme changes
  useEffect(() => {
    const handler = (e) => setSystemDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const isDark = mode === "dark";

  // Apply theme to document and persist
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    localStorage.setItem("ss-theme", mode);
  }, [isDark, mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
