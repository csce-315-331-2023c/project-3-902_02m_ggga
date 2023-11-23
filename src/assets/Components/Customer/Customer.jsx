import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Customer.css";
import tea from "./assets/MilkTea_ClassicPearl_Black.jpg";
import Modal from "react-modal";
import Weather from "./Weather";

Modal.setAppElement("#root");

const ProductModal = ({ isOpen, onClose, addToCart, product }) => {
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
          <img src={tea} alt={product.name} />
        </div>
        <div className="modal-container-right">
          <h2 style={{ padding: "1rem" }}>{product.name}</h2>
          <p>Price: ${product.price}</p>
          <div className="dropdown-container">
            <div className="dropdown-mods">
              <label htmlFor="">Sugar Level</label>
              <select name="sugar" className="select-menu">
                <option value="1">Normal</option>
                <option value="2">Extra Sugar</option>
                <option value="0">No Sugar</option>
              </select>
            </div>
            <div className="dropdown-mods">
              <label htmlFor="">Milk</label>
              <select name="milk" className="select-menu">
                <option value="1">Normal</option>
                <option value="2">Extra Milk</option>
                <option value="0">No Milk</option>
              </select>
            </div>
            <div className="dropdown-mods">
              <label htmlFor="">Boba</label>
              <select name="boba" className="select-menu">
                <option value="0">No Boba</option>
                <option value="1">Boba</option>
                <option value="2">Extra Boba</option>
              </select>
            </div>
          </div>
          <div className="modal-button-container">
            <button onClick={onClose} className="modal-buttons b1">
              Close
            </button>
            <button
              onClick={() => addToCart(product)}
              className="modal-buttons b2"
            >
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
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios
      .get("https://mocktea.onrender.com/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products", error));
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const addToCart = (product) => {
    const cartData = {
      id: product.id,
      name: product.name,
      price: product.price,
      // sugar: /* get sugar value */,
      // milk: /* get milk value */,
      // boba: /* get boba value */,
    };

    axios
      .post("http://mocktea.onrender.com/addtocart/", cartData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error adding product to cart", error);
      });

    setCart((prevCart) => {
      const updatedCart = [...prevCart, product];
      console.log(updatedCart);
      return updatedCart;
    });

    closeModal();
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
              addToCart={addToCart}
            />
          )}
        </div>
      </div>
      {/*<Weather/>*/}
    </div>
  );
}

export default Customer;
