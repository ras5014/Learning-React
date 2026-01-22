import React from "react";
import ReactDOM from "react-dom/client";
import { Header } from "./Header.jsx";
import "./index.css";
import { AppStoreProvider } from "./providers/AppStoreProvider.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppStoreProvider>
    <Header />
  </AppStoreProvider>,
);
