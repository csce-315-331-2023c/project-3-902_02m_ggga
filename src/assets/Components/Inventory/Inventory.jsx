import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Inventory.css';
import Popup from './../Popup/Popup';
import { Input } from '@mui/material';


export const Inventory = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonPopup2, setButtonPopup2] = useState(false);
  const [buttonPopup3, setButtonPopup3] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState('');
  const [newItem, setNewItem] = useState({
    name: '',
    price_per_unit: '',
    quantity: '',
    last_bought_date: '',
    minimum: ''
  });


  useEffect(() => {
    // Fetch the inventory data when the component mounts
    axios
      .get("http://localhost:5000/inventory") // Ensure this URL points to your API endpoint
      .then((response) => {
        // Update state with the fetched inventory items
        setInventoryItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching inventory", error);
      });
  }, []); // The empty array ensures this effect runs only once on mount


  const handleInputChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const addInventoryItem = () => {
    axios
      .post('http://localhost:5000/inventory', newItem)
      .then((response) => {
        setInventoryItems([...inventoryItems, response.data]);
        setButtonPopup(false); // Close the popup
      })
      .catch((error) => {
        console.error("Error adding inventory item", error);
      });
  };

  const deleteItem = () => {
    axios
      .delete(`http://localhost:5000/${deleteItemId}`)
      .then(() => {
        // Update the state to remove the deleted item
        setInventoryItems(inventoryItems.filter(item => item.id !== deleteItemId));
        setButtonPopup(false);
      })
      .catch((error) => {
        console.error("Error deleting item", error);
      });
  };


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
            <th id='min'>Minimum Required</th>
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
              <td id='min'>{item.minimum}</td>
              {console.log(item)}
              
            </tr>
          ))}
        </tbody>
      </table>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        Item Name: <input name="name" onChange={handleInputChange} />
        Price Per Unit: <input name="price_per_unit" onChange={handleInputChange} />
        Quantity: <input name="quantity" onChange={handleInputChange} />
        Last Bought Date: <input name="last_bought_date" onChange={handleInputChange} />
        Minimum Required: <input name="minimum" onChange={handleInputChange} />
        <br />
        <button onClick={addInventoryItem}>Enter</button>
      </Popup>

      <Popup trigger={buttonPopup2} setTrigger={setButtonPopup2}>
      Enter ID to delete
        <input type="text" value={deleteItemId} onChange={(e) => setDeleteItemId(e.target.value)} />
        <br />
        <button onClick={deleteItem}>Delete Item</button>
      </Popup>

      <Popup trigger={buttonPopup3} setTrigger={setButtonPopup3}>
      Enter ID of Item you wish to edit
      <input></input>
      
      </Popup>





      <button clasName="popup-button" onClick={() => setButtonPopup(true)}>Add New Item</button>
      <button  className="popup-button" onClick={() => setButtonPopup2(true)}>Delete Item</button>
      <button className="popup-button" onClick={() => setButtonPopup3(true)}>Edit Item</button>
    </div>
  );
};
