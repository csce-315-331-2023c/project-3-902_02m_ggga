import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Inventory.css';

export const Inventory = () => {
  const [inventoryItems, setInventoryItems] = useState([]);

  useEffect(() => {
    // Fetch the inventory data when the component mounts
    axios
      .get("http://localhost:5000/api/inventory") // Ensure this URL points to your API endpoint
      .then((response) => {
        // Update state with the fetched inventory items
        setInventoryItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching inventory", error);
      });
  }, []); // The empty array ensures this effect runs only once on mount

  return (
    <div className="centered-container-inventory">
      <h1>Inventory</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price per Unit</th>
            <th>Quantity</th>
            <th>Last Bought Date</th>
            <th>Minimum Required</th>
          </tr>
        </thead>
        <tbody>
          {inventoryItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.price_per_unit}</td>
              <td>{item.quantity}</td>
              <td>{new Date(item.last_bought_date).toLocaleDateString()}</td>
              <td>{item.minimum}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
