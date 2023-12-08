import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MenuM.css";
import headerImage from "/src/assets/Components/ShareTea_Header.png";
import { Link } from "react-router-dom";
import Weather from "./Weather";
import Accessibility from "../Accessibility/Accessibility";








export const MenuM = () => {
  const [products, setProducts] = useState([]);
  const [accessibilityOptions, setAccessibilityOptions] = useState([]);

  // Fetch products from the backend
  useEffect(() => {
    axios
      .get("https://mocktea.onrender.com/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products", error));
  }, []);

    /**
   * the toggleStyle function is called within the handleAccessibilityOption function below.
   * This grabs the element we want to change, finds the value fo the stylename we want to change, then sets it using the value we input.
   * If there it will either be the updated accessibility value, or the default value that is grabs at the initialization of the function
   * @param {*} element
   * @param {*} styleName
   * @param {*} value
   */

    const toggleStyle = (element, styleName, value) => {
        const chosenStyle = element.style[styleName];
        element.style[styleName] = chosenStyle ? "" : value;
      };
      /**
       * handles accessibity options for customer page
       * @param {*} option
       */
      const handleAccessibilityOption = (option) => {
        const updatedOptions = [...accessibilityOptions];
        const productLabels = document.querySelectorAll(".product-info");
        const popup = document.querySelectorAll(".modal-container-right");
        const body = document.body;
        const products = document.querySelectorAll(".product-button");
        switch (option) {
          case "biggerText":
            productLabels.forEach((label) => {
              toggleStyle(label, "font-size", "1.2rem");
            });
            popup.forEach((text) => {
              toggleStyle(text, "font-size", "1.2rem");
            });
            toggleStyle(body, "font-size", "1.2rem");
            break;
          case "highContrast":
            toggleStyle(body, "backgroundColor", "#000");
            products.forEach((button) => {
              toggleStyle(button, "backgroundColor", "#fff");
              toggleStyle(button, "color", "#000");
            });
            break;
          case "legibleText":
            toggleStyle(body, "font-family", "Times New Roman, Times, serif");
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
        <div className="weather-container">
          <Weather />
        </div>
        <div className="sharetea_header">
          <img src={headerImage} alt="ShareTea" />
        </div>
        <ul className="links">
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>

      <div className="body">
        <div className="button-containerM">
          {products.map((product) => (
            <div key={product.name} className="product-displayM">
              <img
                src={product.image_url}
                alt={product.name}
                className="product-imageM"
              />
              <div className="product-infoM">
                <div>{product.name}</div>
                <div>${product.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Accessibility onOptionClick={handleAccessibilityOption} />
      </div>
    </div>
  );
};

export default MenuM;


