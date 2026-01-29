import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Counter } from "./Counter.jsx";
import { Provider } from "react-redux";
import FallbackStoreProvider from "./providers/FallbackStoreProvider.jsx";

let root = null;

const isStandalone = !window.singleSpaNavigate; // Defined in products app

/**
 * BOOTSTRAP - One time setup
 * Called once when the application is first registered
 */
export async function bootstrap(props) {
  console.log("🔧 Counter: Bootstrap called", props);
}

/**
 * MOUNT - Render when active
 * Called when route matches
 */

export async function mount(props) {
  console.log("📌 Counter: Mount called with props:", props);
  const rootElement = document.getElementById("counter-app");
  root = ReactDOM.createRoot(rootElement);

  // Safety check: ensure the container exists before rendering
  if (!rootElement) {
    console.warn("Counter root element not found: #counter-app");
    return;
  }

  const { store } = props;

  if (store) {
    root.render(
      <Provider store={store}>
        <Counter />
      </Provider>,
    );
  } else {
    root.render(
      <FallbackStoreProvider>
        <Counter />
      </FallbackStoreProvider>,
    );
  }
}

/**
 * UNMOUNT - Cleanup when not active
 * Called when route no longer matches
 */

export async function unmount(props) {
  console.log("🧹 Counter: Unmount called with props:", props);
  if (root) {
    root.unmount();
    root = null;
  }
}

if (isStandalone) {
  // If running standalone, immediately mount the app
  mount({});
}
