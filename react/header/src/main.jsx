import React from "react";
import ReactDOM from "react-dom/client";
import { Header } from "./Header.jsx";
import "./index.css";

let root = null;

export async function bootstrap(props) {
  console.log("🔧 Header: Bootstrap called");
}

export async function mount(props) {
  console.log("📌 Header: Mount called");
  const rootElement = document.getElementById("header-app");
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
