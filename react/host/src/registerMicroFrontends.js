import { registerApplication } from "single-spa";
import { store } from "./app/store";

/**
 * Register all micro-frontend applications
 * This tells single-spa about each app and when to activate it
 */

// Register Header - Always visible
registerApplication({
  name: "@app/header",
  app: () => System.import("@app/header/singleSpaEntry"),
  activeWhen: ["/"], // Always active on root path
  props: {},
});

// Register Products - Active on /products path
registerApplication({
  name: "@app/products",
  app: () => System.import("@app/products/singleSpaEntry"),
  activeWhen: ["/products"],
  props: {},
});

// Register Counter - Active on /counter path
registerApplication({
  name: "@app/counter",
  app: () => System.import("@app/counter/singleSpaEntry"),
  activeWhen: ["/counter"],
  props: { store },
});

console.log("✅ Micro-frontends registered with single-spa");
