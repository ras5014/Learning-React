import React from "react";
import { BrowserRouter as Router, Link } from "react-router";

export function App() {
  return (
    <Router>
      <div>
        {/* Navigation */}
        <nav className="nav">
          <Link to="/" className="ml-20">
            Home
          </Link>
          <Link to="/counter" className="ml-20">
            Counter
          </Link>
          <Link to="/products" className="ml-20">
            Products
          </Link>
        </nav>

        {/* Container for Header (always visible) */}
        <div id="header-app" className="p-10"></div>

        {/* Container for Counter (mounted when route is /counter) */}
        <div id="counter-app" className="p-10"></div>

        {/* Container for Products (mounted when route is /products) */}
        <div id="products-app" className="p-10"></div>
      </div>
    </Router>
  );
}
