import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(
    () => localStorage.getItem("theme-mode") || "system"
  );

  const getSystemTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  const applyTheme = (resolvedTheme) => {
    document.documentElement.setAttribute(
      "data-theme",
      resolvedTheme
    );

    if (resolvedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const resolveTheme = () =>
    mode === "system" ? getSystemTheme() : mode;

  useEffect(() => {
    const resolved = resolveTheme();
    applyTheme(resolved);
    localStorage.setItem("theme-mode", mode);
  }, [mode]);

  useEffect(() => {
    if (mode !== "system") return;

    const mediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const handler = () => {
      applyTheme(getSystemTheme());
    };

    mediaQuery.addEventListener("change", handler);
    return () =>
      mediaQuery.removeEventListener("change", handler);
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};