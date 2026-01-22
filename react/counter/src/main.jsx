import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Counter } from "./Counter.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Try to load AppStoreProvider, fallback to Fragment if not available
try {
  const { default: AppStoreProvider } = await import("host/AppStoreProvider");
  root.render(
    <AppStoreProvider>
      <Counter />
    </AppStoreProvider>
  );
} catch (error) {
  console.warn("Host AppStoreProvider not available, rendering without it:", error);
  root.render(<Counter />);
}
