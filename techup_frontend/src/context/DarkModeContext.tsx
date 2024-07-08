import { createContext, ReactNode, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

export interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}
type SetState<T> = React.Dispatch<React.SetStateAction<T>>;
const DarkModeContext = createContext<DarkModeContextType | null>(null);

function DarkModeProvider({ children }: {children: ReactNode}) {
  const [isDarkMode, setIsDarkMode]: [boolean, SetState<boolean>] = useLocalStorageState<boolean>("isDarkMode",
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(
    function () {
      if (isDarkMode) {
        document.documentElement.classList.add("dark-mode");
        document.documentElement.classList.remove("light-mode");
      } else {
        document.documentElement.classList.add("light-mode");
        document.documentElement.classList.remove("dark-mode");
      }
    },
    [isDarkMode]
  );

  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext) as DarkModeContextType;
  if (context === undefined)
    throw new Error("DarkModeContext was used outside of DarkModeProvider");
  return context;
}

export { DarkModeProvider, useDarkMode };
