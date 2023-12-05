import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Menu.css';
import './../Popup/Popup';
import Popup from './../Popup/Popup';

export const Menu = () => {
  const [products, setProducts] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [editPopup, setEditPopup] = useState(false);
  const [deletedItemId, setDeletedItemId] = useState('');
  const [newProduct, setNewProduct] = useState({
      name: '',
      price: '',
      ingredients: '',
      // Add other product properties as needed
      image_url: '',
    });
    

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products", error));
  }, []);

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const addNewProduct = () => {
    // Validate inputs as necessary before sending
    axios
      .post("http://localhost:5000/products", newProduct)
      .then((response) => {
        // Add the new product to the products state
        setProducts([...products, response.data]);
        // Close the popup
        setButtonPopup(false);
        // Reset the new product state if needed
        setNewProduct({ name: '', price: '', ingredients: '', image_url: '' });
      })
      .catch((error) => console.error("Error adding product", error));
  };

  const handleDeleteInputChange = (e) => {
    setDeletedItemId(e.target.value);
  };

  const deleteProduct = () => {
    const itemIdToDelete = Number(deletedItemId); // Convert to number
  
    axios
      .delete(`http://localhost:5000/${itemIdToDelete}`)
      .then(() => {
        setProducts(products.filter((product) => product.id !== itemIdToDelete));
        setDeletePopup(false);
        setDeletedItemId('');
      })
      .catch((error) => console.error("Error deleting product", error));
  };
  


  return (
    <div className="centered-container-menu">
      <h1 id="header">Menu</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Ingredients</th>
            {/* Add more headings as per your product data structure */}
            <th>Image URL</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.ingredients}</td>
              <td id="url">{product.image_url}</td>
              {console.log(product)}
            </tr>
          ))}
        </tbody>
      </table>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
          <h3>Add New Menu Item</h3>
          Item Name: <input name="name" value={newProduct.name} onChange={handleInputChange}/>
          Price: <input name="price" value={newProduct.price} onChange={handleInputChange}/>
          Ingredients: <input name="ingredients" value={newProduct.ingredients} onChange={handleInputChange}/>
          Image URL: <input name="image_url" value={newProduct.image_url} onChange={handleInputChange}/>
          <br />
          <button onClick={addNewProduct}>Enter</button>
      </Popup>

      <Popup trigger={deletePopup} setTrigger={setDeletePopup}>
        <h3>Delete Menu Item</h3>
        Item ID: <input value={deletedItemId} onChange={handleDeleteInputChange}/>
        <br />
        <button onClick={deleteProduct}>Enter</button>
      </Popup>

      <Popup trigger={editPopup} setTrigger={setEditPopup}>
        <h3>Delete Menu Item</h3>
        Item ID: <input value={deletedItemId} onChange={handleDeleteInputChange}/>
        <br />
        <button onClick={deleteProduct}>Enter</button>
      </Popup>
      <br />
      <br />

      <button className="popup-button" onClick={() => setButtonPopup(true)}>Add New Menu Item</button>
      <br />
      <button className="popup-button" onClick={() => setDeletePopup(true)}>Delete Menu Item</button>
      <br />
      <button className="popup-button" onClick={() => setEditPopup(true)}>Edit Menu Item</button>
    </div>
  );
}
