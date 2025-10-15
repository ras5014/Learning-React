import { createContext, useState } from "react";

// Create the Context object with a default value
export const ThemeContext = createContext("light");

// Create a Provider component
export const ThemeProvider = ({ children }) => {
  // Global State for theme
  const [theme, setTheme] = useState<string>("light");
  // Function to toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme: string) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
