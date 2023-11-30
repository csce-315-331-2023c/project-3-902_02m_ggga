import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Customer.css";
import tea from "./assets/MilkTea_ClassicPearl_Black.jpg";
import headerImage from "./assets/ShareTea_Header.png";
import Modal from "react-modal";
import Weather from "./Weather";
import { Link } from "react-router-dom";

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
          <img src={product.image_url || tea} alt={product.name} />
        </div>
        <div className="modal-container-right">
          <h2 style={{ padding: "1rem" }}>{product.name}</h2>
          <p className="modal-price">Price: ${product.price}</p>
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
  const [maxOrderId, setMaxOrderId] = useState(null);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    axios
      .get("https://mocktea.onrender.com/orderid")
      .then((response) => setMaxOrderId(response.data))
      .catch((error) => console.error("Error fetching max order ID", error));
  }, []);

  useEffect(() => {
    axios
      .get("https://mocktea.onrender.com/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products", error));
  }, []);

  const OrderSuccessModal = ({ isOpen, onClose }) => {
    return (
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel="Order Success Modal"
        className="order-success-modal"
        overlayClassName="order-success-overlay"
      >
        <div className="order-success-container">
          <h2>Order Successfully Placed!</h2>
          <p>
            Your order has been placed successfully. Thank you for choosing
            ShareTea!
          </p>
          <p>Order Number: {maxOrderId + 1}</p>
          <button onClick={onClose} className="close-button">
            Close
          </button>
        </div>
      </Modal>
    );
  };

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
      {
        name: product.name,
        price: product.price,
        ingredients: product.ingredients,
        quantity: 1,
      },
    ]);
    closeModal();
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const placeOrder = async () => {
    const orderData = {
      orderID: maxOrderId + 1,
      tip: 0,
      price: cart
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2),
      order_date: new Date().toLocaleDateString(),
      order_time: new Date().toLocaleTimeString(),
      items: cart.map((item) => item.name),
    };

    try {
      for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        const ingredientsArray = product.ingredients.split(",");
        ingredientsArray.forEach(async (ingredient) => {
          try {
            await axios.post(
              "https://mocktea.onrender.com/neworderinventory",
              { id: ingredient },
              {
                headers: { "Content-Type": "application/json" },
              }
            );
            console.log("Ingredient:", ingredient);
          } catch (error) {
            console.error("Error processing ingredient", error);
          }
        });
      }
      await axios.post("https://mocktea.onrender.com/neworder", orderData, {
        headers: { "Content-Type": "application/json" },
      });
      setCart([]);
      setIsCartOpen(false);
      setIsOrderSuccessOpen(true);
    } catch (error) {
      console.error("Error placing order", error);
    }
  };

  return (
    <div>
      <nav className="header">
        <div className="weather-container">
          <Weather />
        </div>
        <div className="sharetea_header">
          <img src={headerImage} alt="ShareTea" />
        </div>
        <ul className="links">
          <li onClick={toggleCart}>
            View Cart{" "}
            {cartCount > 0 && (
              <span className="cart-counter">- {cartCount}</span>
            )}
          </li>
          <li>
            <Link to="/">Home</Link>
          </li>
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
              <img
                src={product.image_url || tea}
                alt={product.name}
                className="product-image"
              />
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
        <div
          className="cart-dropdown"
          style={{ minWidth: cart.length > 0 ? "300px" : "auto" }}
        >
          <h3>Shopping Cart</h3>
          {cart.length === 0 ? (
            <p style={{ textAlign: "center" }}>Cart is Empty</p>
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
          {cart.length > 0 && (
            <div className="cart-button-container">
              <button className="cart-buttons b2" onClick={placeOrder}>
                Place Order
              </button>
              <button className="cart-buttons b1" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          )}
        </div>
      )}
      <OrderSuccessModal
        isOpen={isOrderSuccessOpen}
        onClose={() => setIsOrderSuccessOpen(false)}
      />
      {/*<Weather/>*/}
    </div>
  );
}

export default Customer;

/* query to read order items with the mods
SELECT
  id,
  ARRAY(
    SELECT
      regexp_replace(item::text, '\(.*$', '')::text
    FROM unnest(items) item
  ) AS processed_items,
  tip,
  price,
  order_date,
  order_time
FROM
  orders;

  date,
  time
FROM
  orders;
 */
