import React, { Suspense, lazy } from "react";

// lazy loading remote components
const Header = lazy(() =>
  import("header/Header").then((module) => ({ default: module.Header }))
);
const Products = lazy(() =>
  import("products/Products").then((module) => ({ default: module.Products }))
);

export function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading Header...</div>}>
        <Header />
      </Suspense>
      <Suspense fallback={<div>Loading Products...</div>}>
        <Products />
      </Suspense>
    </div>
  );
}
