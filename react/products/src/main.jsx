import React from "react";
import ReactDOM from "react-dom/client";
import { Products } from "./Products.jsx";
import "./index.css";

// Store React root instance for cleanup
let root = null;

/**
 * Detect if app is running standalone vs. under single-spa orchestration
 * - When running with single-spa (in host app), window.singleSpaNavigate exists
 * - When running standalone (npm start), window.singleSpaNavigate is undefined
 */
const isStandalone = !window.singleSpaNavigate;

/**
 * BOOTSTRAP - Single-spa lifecycle function
 * Called once when the micro-frontend is first registered
 * Used for one-time initialization (e.g., loading config, initializing services)
 */
export async function bootstrap(props) {
  console.log("🔧 Products: Bootstrap called");
}

/**
 * MOUNT - Single-spa lifecycle function
 * Called when the route matches (e.g., user navigates to /products)
 * Renders the React component to the DOM
 */
export async function mount(props) {
  console.log("📌 Products: Mount called");

  // Find the container element in the DOM
  const rootElement = document.getElementById("products-app");

  // Safety check: ensure the container exists before rendering
  if (!rootElement) {
    console.warn("Products root element not found: #products-app");
    return;
  }

  // Create React root and render the component
  root = ReactDOM.createRoot(rootElement);
  root.render(<Products />);
}

/**
 * UNMOUNT - Single-spa lifecycle function
 * Called when the route no longer matches (e.g., user navigates away from /products)
 * Cleans up the React component and removes it from the DOM
 */
export async function unmount(props) {
  console.log("🗑️ Products: Unmount called");

  // Clean up: unmount React component and release memory
  if (root) {
    root.unmount();
    root = null;
  }
}

/**
 * STANDALONE MODE
 * When running this MFE independently (npm start in products folder):
 * - single-spa is not active, so mount() never gets called automatically
 * - We manually call mount() to render the app
 * This allows developers to run and test this micro-frontend in isolation
 */
if (isStandalone) {
  mount({});
}
