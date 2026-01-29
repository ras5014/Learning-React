import React from "react";
import ReactDOM from "react-dom/client";
import { Products } from "./Products.jsx";
import "./index.css";

let root = null;

export async function bootstrap(props) {
  console.log("🔧 Products: Bootstrap called");
}

export async function mount(props) {
  console.log("📌 Products: Mount called");
  const rootElement = document.getElementById("products-app");
  root = ReactDOM.createRoot(rootElement);
  root.render(<Products />);
}

export async function unmount(props) {
  console.log("🗑️ Products: Unmount called");
  if (root) {
    root.unmount();
    root = null;
  }
}
