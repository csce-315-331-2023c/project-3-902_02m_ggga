import React from "react";
import ReactDOM from "react-dom/client";
// import App from './App.jsx'
import Cashier, { Header } from "./Cashier.jsx";
import Customer from "./Customer.jsx";
import Weather from "./Weather.jsx";
// import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Customer />
    <Weather />
  </React.StrictMode>
);
