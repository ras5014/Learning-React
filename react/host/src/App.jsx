import React, { Suspense, lazy } from "react";

// lazy loading remote components
const Header = lazy(() =>
  import("header/Header").then((module) => ({ default: module.Header })),
);
const Products = lazy(() =>
  import("products/Products").then((module) => ({ default: module.Products })),
);

const Counter = lazy(() =>
  import("counter/Counter").then((module) => ({ default: module.Counter })),
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
      <Suspense fallback={<div>Loading Counter...</div>}>
        <Counter />
      </Suspense>
    </div>
  );
}
