import { useContext } from 'react';
import './App.css'
import { ThemeContext } from './context/ThemeContext';

function App() {

  const { theme, toggleTheme } = useContext(ThemeContext);

  const appStyle = {
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: theme === "light" ? "#fff" : "#333",
    color: theme === "light" ? "#000" : "#fff",
  };

  return (
    <div style={appStyle}>
      <h1>{theme.toUpperCase()} MODE</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  )
}

export default App
