import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import "./index.css";
import { AppStoreProvider } from "./providers/AppStoreProvider.jsx";

// IMPORTANT: Register micro-frontends BEFORE starting single-spa
import "./registerMicroFrontends";
import { start } from "single-spa";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppStoreProvider>
    <App />
  </AppStoreProvider>,
);

// Start single-spa routing
// This must happen AFTER React app is mounted
start();

console.log("✅ single-spa started");
