import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Customer.css";
import tea from "./assets/MilkTea_ClassicPearl_Black.jpg";
import Modal from "react-modal";

Modal.setAppElement("#root");

const ProductModal = ({ isOpen, onClose, product }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Product Modal"
      className="product-modal"
      overlayClassName="product-overlay"
    >
      <div className="modal-container">
        <div className="modal-container-left">
          <img src={tea} alt={product.name} style={{ padding: "1rem" }} />
        </div>
        <div className="modal-container-right">
          <h2 style={{ padding: "1rem" }}>{product.name}</h2>
          <p>Price: ${product.price}</p>
          <select name="sugar">
            <option value="">Extra Sugar</option>
            <option value="">Extra Sugar</option>
            <option value="">Extra Sugar</option>
          </select>
          <select name="sugar">
            <option value="">Extra Sugar</option>
            <option value="">Extra Sugar</option>
            <option value="">Extra Sugar</option>
          </select>
          <select name="sugar">
            <option value="">Extra Sugar</option>
            <option value="">Extra Sugar</option>
            <option value="">Extra Sugar</option>
          </select>
          <div className="modal-button-container">
            <button onClick={onClose} className="modal-buttons b1">
              Close
            </button>
            <button onClick={onClose} className="modal-buttons b2">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

function Customer() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products", error));
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div>
      <nav className="header">
        <div className="sharetea_header">ShareTea</div>
        <ul className="links">
          <li onClick={() => handleViewChange("viewOrders")}> View Orders</li>
          <li onClick={() => handleViewChange("placeOrders")}>Place Orders</li>
          <li>Log Out</li>
        </ul>
      </nav>
      <div className="body">
        <div className="button-container">
          {products.map((product) => (
            <button
              key={product.name}
              className="product-button"
              onClick={() => openModal(product)}
            >
              <img src={tea} alt={product.name} className="product-image" />
              <div className="product-info">
                <div>{product.name}</div>
                <div>${product.price}</div>
              </div>
            </button>
          ))}

          {selectedProduct && (
            <ProductModal
              isOpen={!!selectedProduct}
              onClose={closeModal}
              product={selectedProduct}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Customer;
