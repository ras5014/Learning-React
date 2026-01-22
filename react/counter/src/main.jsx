import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Counter } from "./Counter.jsx";
import FallbackStoreProvider from "./providers/FallbackStoreProvider.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Dual-mode rendering: works both standalone AND federated
// This try-catch pattern ensures Counter can run in two environments:
//
// TRY block (Federated mode):
//   - When loaded by host via Module Federation
//   - Imports AppStoreProvider from host
//   - Uses host's Redux store → shared state across all micro-frontends
//
// CATCH block (Standalone mode):
//   - When running 'npm start' in counter folder directly
//   - Host is unavailable, so use FallbackStoreProvider
//   - FallbackStoreProvider creates a local Redux store
//   - Counter works independently with its own state

try {
  const { default: AppStoreProvider } = await import("host/AppStoreProvider");
  root.render(
    <AppStoreProvider>
      <Counter />
    </AppStoreProvider>,
  );
} catch (error) {
  console.warn(
    "Host AppStoreProvider not available, rendering without it:",
    error,
  );
  root.render(
    <FallbackStoreProvider>
      <Counter />
    </FallbackStoreProvider>,
  );
}
