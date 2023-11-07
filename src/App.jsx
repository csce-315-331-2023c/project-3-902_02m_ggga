import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products", error));
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      {products.map((product) => (
        <button key={product.name}>{product.name}</button>
      ))}
    </div>
  );
}

export default App;
