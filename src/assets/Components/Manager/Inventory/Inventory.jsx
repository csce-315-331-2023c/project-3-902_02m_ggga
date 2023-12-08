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
  const [settingPopup, setSettingPopup] = useState(false);
  const [isLargeText, setIsLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  const contrastClass = highContrast ? 'high-contrast' : '';

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


  const setLargeText = (value) => {
    console.log("Large text now: ", value);
    setIsLargeText(value);
  };

  const fontSizeClass = isLargeText ? 'font-size-large' : 'font-size-default';

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
    <div className={`centered-container-inventory ${fontSizeClass} ${contrastClass}`}>
      <button className="access" onClick={() => setSettingPopup(true)}>
        Accessibility
      </button>
      <h1 > Inventory</h1>
      <table className={fontSizeClass}> 
        <thead className={fontSizeClass}>
          <tr className={fontSizeClass}>
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

        <div className={` ${contrastClass}`}>
          <br/> 
          <h1 className={` ${contrastClass}`}>Item Name: </h1>
          <input className={` ${contrastClass}`} name="name" onChange={handleInputChange} />
          <h1 className={` ${contrastClass}`}>Price Per Unit:</h1> <input className={` ${contrastClass}`} name="price_per_unit" onChange={handleInputChange} />
          <h1 className={` ${contrastClass}`}>Quantity:</h1> <input className={` ${contrastClass}`} name="quantity" onChange={handleInputChange} />
          <h1 className={` ${contrastClass}`}>Last Bought Date:</h1> <input className={` ${contrastClass}`} name="last_bought_date" onChange={handleInputChange} />
          <h1 className={` ${contrastClass}`}>Minimum Required:</h1> <input className={` ${contrastClass}`} name="minimum" onChange={handleInputChange} />
          <br/>
          <button className={` ${contrastClass}`} onClick={addInventoryItem}>Enter</button>
        </div>
      </Popup>

      <Popup  trigger={deletePopup} setTrigger={setDeletePopup}>
      <br/> 
      <div className={` ${contrastClass}`}>
        <h3 className={` ${contrastClass}`}>Enter inventory Item</h3>
        <p className={` ${contrastClass}`} >Item ID:</p>
        <input className={` ${contrastClass}`} value={deleteItemId} onChange={handleDeleteInputChange} />
        <br/>
        <br />
        <button onClick={deleteItem}>Delete Item</button>
      </div>
      </Popup>

      <Popup  trigger={editPopup} setTrigger={setEditPopup}>
        <div className={` ${contrastClass}`}>
          <br/>
          <h3 className={` ${contrastClass}`}>Edit Inventory Information</h3>
          <p>Enter the ID of the Item you wish to edit </p>
          <input className={` ${contrastClass}`} value={editItemId} onChange={(e) => setEditItemId(e.target.value)} onBlur={() => fetchItemToEdit(editItemId)}></input>
          
          <h3 className={` ${contrastClass}`} >Modify the fields you wish to change</h3>

          <p>Name </p>
          <input  className={` ${contrastClass}`} name="name" value={editItemDetails.name} onChange={handleEditInputChange}></input>

          <p>Quantity</p>  <input className={` ${contrastClass}`} name="quantity" value={editItemDetails.quantity} onChange={handleEditInputChange}></input>

          <p>Last Bought Date</p> <input className={` ${contrastClass}`} name="last_bought_date" value={editItemDetails.last_bought_date} onChange={handleEditInputChange}></input>

          <p>Minimum Required</p> <input className={` ${contrastClass}`} name="minimum" value={editItemDetails.minimum} onChange={handleEditInputChange}></input>
          <br/>
          <button onClick={updateItem}>Submit</button>
        </div>
      </Popup>
      
      <Popup  trigger={settingPopup}  setTrigger={setSettingPopup}>
        <div className={` ${contrastClass}`}>
        <br />
        <h3 className={` ${contrastClass}`}>Accessibility Settings</h3>
        <br />
        <h2 className={` ${contrastClass}`}>Contrast</h2>
        <br></br>
        <div className={`settings-section ${contrastClass}`}>
            
            <button onClick={() => setHighContrast(true)}>High Contrast</button>
            <button onClick={() => setHighContrast(false)}>Default Contrast</button>

        </div>
        <br></br>
        <h2 className={` ${contrastClass}`}>Font Size</h2>
        <br></br>
        <div className={` settings-section ${contrastClass}`}>
           
            <button className={` ${contrastClass}`} onClick={() => setLargeText(true)}>Large</button>
            <br />
            <button className={` ${contrastClass}`} onClick={() => setLargeText(false)}>Default</button>
        </div>
        
        <h2 className={` ${contrastClass}`}>Font Type</h2>
        <br></br>
        <div className={` settings-section ${contrastClass}`}>
           
            <button>Legible</button>
            <br />
            <button>Default</button>
        </div>
        </div>

      </Popup>

          
      <br />
      <br />
      <button className={`pop ${fontSizeClass}`} onClick={() => setButtonPopup(true)}>Add New Item</button>
      <br />
      <button className={`pop ${fontSizeClass}`} onClick={() => setDeletePopup(true)}>Delete Item</button>
      <br />
      <button className={`pop ${fontSizeClass}`} onClick={() => setEditPopup(true)}>Edit Item</button>
    </div>
  );
};
