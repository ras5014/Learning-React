import { BrowserRouter, Routes, Route, Link } from 'react-router'

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
      </nav>

      <Routes>
        <Route path="/" element={<div>Host App Home</div>} />
        <Route path="/products/*" element={<div id="products-app"></div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App