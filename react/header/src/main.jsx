import React from "react";
import ReactDOM from "react-dom/client";
import { Header } from "./Header.jsx";
import "./index.css";

let root = null;
const isStandalone = !window.singleSpaNavigate; // Defined in products app

export async function bootstrap(props) {
  console.log("🔧 Header: Bootstrap called");
}

export async function mount(props) {
  console.log("📌 Header: Mount called");
  const rootElement = document.getElementById("header-app");

  // Safety check: ensure the container exists before rendering
  if (!rootElement) {
    console.warn("Header root element not found: #header-app");
    return;
  }

  root = ReactDOM.createRoot(rootElement);
  root.render(<Header />);
}

export async function unmount(props) {
  console.log("🗑️ Header: Unmount called");
  if (root) {
    root.unmount();
    root = null;
  }
}

if (isStandalone) {
  // If running standalone, immediately mount the app
  mount({});
}
