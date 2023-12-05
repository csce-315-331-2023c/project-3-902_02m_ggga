import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Customer.css";
import tea from "./assets/MilkTea_ClassicPearl_Black.jpg";
import headerImage from "./assets/ShareTea_Header.png";
import Modal from "react-modal";
import Weather from "./Weather";
import { Link } from "react-router-dom";
import Accessibility from "../Accessibility/Accessibility";

Modal.setAppElement("#root");
/**
 * Drop down menu for the customer view. used to define an order
 * @param {*} isOpen used to check to see if the drop down is open
 * @param {*} onClose used to start function for when closing menu
 * @param {*} addToCart used to start the add to cart function when used is ready
 * @param {*} product defines the product the user creates. is a string
 * @returns the javascript used to define the drop down menu
 */
const ProductModal = ({ isOpen, onClose, addToCart, product }) => {
  const [quantity, setQuantity] = useState(1);
  const [sugarLevel, setSugarLevel] = useState("1"); // Default to "Normal"
  const [milk, setMilk] = useState(
    product.name.toLowerCase().includes("milk") ? "1" : "0"
  );
  const [boba, setBoba] = useState(
    product.name.toLowerCase().includes("pearls") ||
      product.name.toLowerCase().includes("pearl")
      ? "1"
      : "0"
  );

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, sugarLevel, milk, boba);
    onClose();
    setQuantity(1);
    setSugarLevel("1"); // Reset sugar level to default
    setMilk("1"); // Reset milk to default
    setBoba("0"); // Reset boba to default
  };

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
          <h2
            style={{
              margin: "1rem 1rem 0",
              paddingBottom: "1rem",
              borderBottom: "black 1px solid",
            }}
          >
            {product.name}
          </h2>
          <p className="modal-price">Price: ${product.price}</p>
          <div className="dropdown-container">
            <div className="dropdown-mods">
              <label htmlFor="">Sugar Level</label>
              <select
                name="sugar"
                className="select-menu"
                onChange={(e) => setSugarLevel(e.target.value)}
              >
                <option value="1">Normal</option>
                <option value="2">Extra Sugar</option>
                <option value="0">No Sugar</option>
              </select>
            </div>
            <div className="dropdown-mods">
              <label htmlFor="">Milk</label>
              <select
                name="milk"
                className="select-menu"
                onChange={(e) => setMilk(e.target.value)}
              >
                {product.name.toLowerCase().includes("milk") ? (
                  <>
                    <option value="1">Normal</option>
                    <option value="2">Extra Milk</option>
                    <option value="0">No Milk</option>
                  </>
                ) : (
                  <>
                    <option value="0">No Milk</option>
                    <option value="1">Milk</option>
                    <option value="2">Extra Milk</option>
                  </>
                )}
              </select>
            </div>
            <div className="dropdown-mods">
              <label htmlFor="">Boba</label>
              <select
                name="boba"
                className="select-menu"
                onChange={(e) => setBoba(e.target.value)}
              >
                {product.name.toLowerCase().includes("pearls") ? (
                  <>
                    <option value="1">Boba</option>
                    <option value="2">Extra Boba</option>
                  </>
                ) : (
                  <>
                    <option value="0">No Boba</option>
                    <option value="1">Boba</option>
                    <option value="2">Extra Boba</option>
                  </>
                )}
              </select>
            </div>
            <div className="dropdown-mods">
              <label htmlFor="">Quantity</label>
              <div className="quantity-button-container">
                <button onClick={decreaseQuantity} className="modal-buttons b1">
                  -
                </button>
                <span className="quantity">{quantity}</span>
                <button onClick={increaseQuantity} className="modal-buttons b2">
                  +
                </button>
              </div>
            </div>
          </div>
          <div className="modal-button-container">
            <button onClick={onClose} className="modal-buttons b1">
              Close
            </button>
            <button onClick={handleAddToCart} className="modal-buttons b2">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

/**
 * used by the customer to place orders
 * @returns the html javascript page that can adapt to our server information
 */
export const Customer = ()  => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [maxOrderId, setMaxOrderId] = useState(null);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  //backend used to collect the orders
  useEffect(() => {
    axios
      .get("https://mocktea.onrender.com/orderid")
      .then((response) => setMaxOrderId(response.data))
      .catch((error) => console.error("Error fetching max order ID", error));
  }, []);
  //backend used to collect the products
  useEffect(() => {
    axios
      .get("https://mocktea.onrender.com/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products", error));
  }, []);
  /**
   * gives a success screen for placing an order
   * @param {*} isOpen checks to see if function is open
   * @param {*} onClose function used to define when model is closed
   * @returns a success screen for order placed
   */
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
  /**
   * 
   * @param {*} product defined as a string that reflects product rom the server
   * @param {*} quantity defined as a positive number
   * @param {*} sugarLevel an in 2, 1, 0 defined by the amount of sugar
   * @param {*} milk amount and type of milk. defined as an int selection
   * @param {*} boba 2, 1, 0 for amount of boba
   */
  const addToCart = (product, quantity, sugarLevel, milk, boba) => {
    let mods = [];
    if (sugarLevel == 2) {
      mods.push("Extra Sugar");
    }
    if (sugarLevel == 0) {
      mods.push("No Sugar");
    }
    if (milk == 2) {
      mods.push("Extra Milk");
    } else if (product.name.toLowerCase().includes("milk") && milk == 0) {
      mods.push("No Milk");
    } else if (!product.name.toLowerCase().includes("milk") && milk == 1) {
      mods.push("Milk");
    }
    if (boba == 2) {
      mods.push("Extra Boba");
    } else if (
      (product.name.toLowerCase().includes("pearls") ||
        product.name.toLowerCase().includes("pearl")) &&
      boba == 0
    ) {
      mods.push("No Boba");
    } else if (
      (!product.name.toLowerCase().includes("pearls") ||
        !product.name.toLowerCase().includes("pearl")) &&
      boba == 1
    ) {
      mods.push("Boba");
    }
    if (quantity > 1) {
      const itemsToAdd = Array.from({ length: quantity }, (_, index) => ({
        name: `${product.name} ${mods.length == 0 ? "" : "(" + mods + ")"}`,
        price: product.price,
        ingredients: product.ingredients,
        quantity: 1,
      }));

      setCart([...cart, ...itemsToAdd]);
      setQuantity(1);
    } else {
      setCart([
        ...cart,
        {
          name: `${product.name} ${mods.length == 0 ? "" : "(" + mods + ")"}`,
          price: product.price,
          ingredients: product.ingredients,
          quantity: quantity,
        },
      ]);
    }

    closeModal();
    setQuantity(1);
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  /**
   * checks the cart to see if there multiple of the same item
   * @returns returns the new minimized cart of items
   */
  const getGroupedCartItems = () => {
    const groupedItems = cart.reduce((result, item) => {
      const existingItem = result.find(
        (groupedItem) => groupedItem.name === item.name
      );
      if (existingItem) {
        existingItem.quantity += item.quantity;
        existingItem.totalPrice += item.price * item.quantity;
      } else {
        result.push({
          name: item.name,
          quantity: item.quantity,
          totalPrice: item.price * item.quantity,
        });
      }
      return result;
    }, []);

    return groupedItems;
  };
  /**
  * used to place orders using info defined from the user. takes in thee local date  
  */
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
          let quantityQuery = 1;
          if (
            (product.name.toLowerCase().includes("extra boba") &&
              ingredient == 1) ||
            (product.name.toLowerCase().includes("extra boba") &&
              ingredient == 7)
          ) {
            quantityQuery = 2;
          }
          if (
            product.name.toLowerCase().includes("extra sugar") &&
            ingredient == 10
          ) {
            quantityQuery = 2;
          }
          if (
            product.name.toLowerCase().includes("extra milk") &&
            ingredient == 20
          ) {
            quantityQuery = 2;
          }
          try {
            await axios.post(
              "https://mocktea.onrender.com/neworderinventory",
              { quan: quantityQuery, id: ingredient },
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
  /**
   * used to effect the accessibilty for the customer site
   * @param {*} styleName takes in the current style of the site
   * @param {*} value takes in the current size of the site
   */
  const toggleStyle = (styleName, value) => {
    const currentStyle = document.body.style[styleName];
    document.body.style[styleName] = currentStyle ? "" : value;
    document.documentElement.style[styleName] = currentStyle ? "" : value;
  };
  /**
   * handles accessibity options for customer page
   * @param {*} option 
   */
  const handleAccessibilityOption = (option) => {
    switch (option) {
      case "biggerText":
        toggleStyle("fontSize", "1.3em");
        break;
      case "highContrast":
        toggleStyle("backgroundColor", "#000");
        toggleStyle("color", "#fff");
        break;
      case "legibleText":
        toggleStyle("fontFamily", "Times New Roman, Times, serif");
        break;
      default:
        document.documentElement.style.fontSize = "";
        document.documentElement.style.backgroundColor = "";
        document.documentElement.style.color = "";
        document.documentElement.style.cursor = "";
    }
  };

  return (
    <div>
      <nav className="header">
        <div className="weather-container"></div>
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
      <div>
        <Accessibility onOptionClick={handleAccessibilityOption} />
      </div>
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
              quantity={quantity}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
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
                {getGroupedCartItems().map((groupedItem, index) => (
                  <li key={index}>
                    {groupedItem.quantity} {groupedItem.name} - $
                    {groupedItem.totalPrice.toFixed(2)}
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
              <button className="cart-buttons b1" onClick={clearCart}>
                Clear Cart
              </button>
              <button className="cart-buttons b2" onClick={placeOrder}>
                Place Order
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