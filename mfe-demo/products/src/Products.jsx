import React from "react";
import ProductList from "./ProductList";
export function Products() {
  const products = ["Product 1", "Product 2", "Product 3"];
  return (
    <div>
      <h2>Products List</h2>
      <ProductList products={products} />
    </div>
  );
}
