import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Menu.css'

export const Menu = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products", error));
  }, []);

  return (
    <div className="centered-container-menu">
          <h1>Product List</h1>
          {products.map((product) => (
            <button key={product.name}>{product.name}</button>
          ))}
    </div>
  )
}
