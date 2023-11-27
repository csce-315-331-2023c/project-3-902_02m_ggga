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
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    axios
      .get("https://mocktea.onrender.com/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products", error));
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsCartOpen(false);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const addToCart = (product) => {
    setCart([
      ...cart,
      { name: product.name, price: product.price, quantity: 1 },
    ]);
    closeModal();
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const placeOrder = async () => {
    const orderData = {
      tip: 0,
      price: cart
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2),
      order_date: new Date().toLocaleDateString(),
      order_time: new Date().toLocaleTimeString(),
      items: cart.map((item) => item.name),
    };

    try {
      console.log(orderData);
      const response = await axios.post(
        "https://mocktea.onrender.com/neworder",
        orderData,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Order placed successfully:", response.data);
      setCart([]);
      setIsCartOpen(false);
    } catch (error) {
      console.error("Error placing order", error);
    }
  };

  return (
    <div>
      <nav className="header">
        <div className="sharetea_header">ShareTea</div>
        <ul className="links">
          <li onClick={toggleCart}>View Cart</li>
          <li>Back</li>
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
      {isCartOpen && (
        <div className="cart-dropdown">
          <h3>Shopping Cart</h3>
          {cart.length === 0 ? (
            <p>Cart is Empty</p>
          ) : (
            <div>
              <ul>
                {cart.map((item, index) => (
                  <li key={index}>
                    {item.name} - ${item.price}
                  </li>
                ))}
              </ul>
              <p className="price-total">
                Total: $
                {cart
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </p>
            </div>
          )}
          {cart.length > 0 && <button onClick={placeOrder}>Place Order</button>}
        </div>
      )}
      {/*<Weather/>*/}
    </div>
  );
}

export default Customer;
