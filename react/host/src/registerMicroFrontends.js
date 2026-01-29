import { registerApplication } from "single-spa";
import { store } from "./app/store";

/**
 * Register all micro-frontend applications
 * This tells single-spa about each app and when to activate it
 */

// Register Header - Always visible
registerApplication({
  name: "@app/header",
  app: () => import("header/singleSpaEntry"), // Here header is name defined in package.json of header MFE
  activeWhen: () => true, // Always active
  customProps: {},
});

// Register Products - Active on /products path
registerApplication({
  name: "@app/products",
  app: () => import("products/singleSpaEntry"),
  activeWhen: (location) => location.pathname.startsWith("/products"),
  customProps: {},
});

// Register Counter - Active on /counter path
registerApplication({
  name: "@app/counter",
  app: () => import("counter/singleSpaEntry"),
  activeWhen: (location) => location.pathname.startsWith("/counter"),
  customProps: { store },
});

console.log("✅ Micro-frontends registered with single-spa");
