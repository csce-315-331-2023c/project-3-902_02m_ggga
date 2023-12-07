import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Inventory.css';
import Popup from './../Popup/Popup';
import { Input } from '@mui/material';

/**
 * used by the manager to edit the inventory of the store
 * @returns the html and javascript used to create the inventory tab
 */
export const Inventory = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [editPopup, setEditPopup] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState('');
  const [editItemId, setEditItemId] = useState('');
  const [editItemDetails, setEditItemDetails] = useState({
    name: '',
    price_per_unit: '',
    quantity: '',
    last_bought_date: '',
    minimum: ''
  });

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
      .get("https://mocktea.onrender.com/inventory") // Ensure this URL points to your API endpoint
      .then((response) => {
        // Update state with the fetched inventory items
        setInventoryItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching inventory", error);
      });
  }, []); // The empty array ensures this effect runs only once on mount

  /**
   * used to set NewItem from the input boxes
   * @param {*} e an item from the input boxes in create new item
   */
  const handleInputChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };
  /**
   * addes inventory item from database taking from NewItem
   * 
   */
  const addInventoryItem = () => {
    axios
      .post('https://mocktea.onrender.com/inventory', newItem)
      .then((response) => {
        setInventoryItems([...inventoryItems, response.data]);
        setButtonPopup(false); // Close the popup
      })
      .catch((error) => {
        console.error("Error adding inventory item", error);
      });
  };
  /**
   * takes in the input from the input and gives it to the DeleteItemId 
   * @param {*} e the id from the input box for delete input
   */
  const handleDeleteInputChange = (e) => {
    setDeleteItemId(e.target.value);
  };
  /**
   * deletes items from the data base its unique id
   */
  const deleteItem = () => {
    const itemIdToDelete = Number(deleteItemId);
    axios
      .delete(`https://mocktea.onrender.com/inventory/${itemIdToDelete}`)
      .then(() => {
        // Update the state to remove the deleted item
        setInventoryItems(inventoryItems.filter(item => item.id !== itemIdToDelete));
        setDeletePopup(false);
        setDeleteItemId('');
      })
      .catch((error) => {
        console.error("Error deleting item", error);
      });
  };


  const handleEditInputChange = (e) => {
    setEditItemDetails({ ...editItemDetails, [e.target.name]: e.target.value });
  };  

  const fetchItemToEdit = (id) => {
    const itemToEdit = inventoryItems.find((item) => item.id === Number(id));
    if (itemToEdit) {
      setEditItemDetails(itemToEdit);
    }
  };
  
  const updateItem = () => {
    axios.put(`https://mocktea.onrender.com/inventory/${editItemId}`, editItemDetails)
      .then((response) => {
        setInventoryItems(inventoryItems.map((item) => 
          item.id === Number(editItemId) ? response.data : item
        ));
        // Close the edit popup and reset states
      })
      .catch((error) => console.error("Error updating inventory item", error));
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
              
            </tr>
          ))}
        </tbody>
      </table>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
      <br/> 
        Item Name: <input name="name" onChange={handleInputChange} />
        Price Per Unit: <input name="price_per_unit" onChange={handleInputChange} />
        Quantity: <input name="quantity" onChange={handleInputChange} />
        Last Bought Date: <input name="last_bought_date" onChange={handleInputChange} />
        Minimum Required: <input name="minimum" onChange={handleInputChange} />
        <br/>
        <button onClick={addInventoryItem}>Enter</button>
      </Popup>

      <Popup trigger={deletePopup} setTrigger={setDeletePopup}>
      <br/>
      <h3>Enter inventory Item</h3>
        Item ID:<input value={deleteItemId} onChange={handleDeleteInputChange} />
        <br/>
        <button onClick={deleteItem}>Delete Item</button>
      </Popup>

      <Popup trigger={editPopup} setTrigger={setEditPopup}>
        <br/>
        <h3>Edit Inventory Information</h3>
        Enter the ID of the Item you wish to edit 
        <input value={editItemId} onChange={(e) => setEditItemId(e.target.value)} onBlur={() => fetchItemToEdit(editItemId)}></input>
        
        <h3>Modify the fields you wish to change</h3>
        Name <input name="name" value={editItemDetails.name} onChange={handleEditInputChange}></input>
        Quantity <input name="quantity" value={editItemDetails.quantity} onChange={handleEditInputChange}></input>
        Last Bought Date <input name="last_bought_date" value={editItemDetails.last_bought_date} onChange={handleEditInputChange}></input>
        Minimum Required <input name="minimum" value={editItemDetails.minimum} onChange={handleEditInputChange}></input>
        <br/>
        <button onClick={updateItem}>Submit</button>
      </Popup>


          
      <br />
      <br />
      <button className='pop' onClick={() => setButtonPopup(true)}>Add New Item</button>
      <br />
      <button className='pop' onClick={() => setDeletePopup(true)}>Delete Item</button>
      <br />
      <button className='pop' onClick={() => setEditPopup(true)}>Edit Item</button>
    </div>
  );
};
