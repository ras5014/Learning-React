import React from "react";

function ProductList({ products }) {
  return (
    <ul>
      {products.map((product, index) => (
        <li key={index}>{product}</li>
      ))}
    </ul>
  );
}

export default ProductList;
