import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Menu.css';
import '../Popup/Popup';
import Popup from '../Popup/Popup';
/**
 * used to edit the menu of a store. connects to the database and is available to the manager
 * @returns the html and javascript for the ui of the menu for managers
 */
export const Menu = () => {
  const [products, setProducts] = useState([]);
  const [buttonPopup, setButtonPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [deletedItemId, setDeletedItemId] = useState('');
  const [editPopup, setEditPopup] = useState(false);
  const [newProduct, setNewProduct] = useState({
      name: '',
      price: '',
      ingredients: '',
      image_url: '',
      // Add other product properties as needed
    });
    
  const [editItemId, setEditItemId] = useState(''); // State to hold the ID of the item to edit
  const [editProductDetails, setEditProductDetails] = useState({
    name: '',
    price: '',
    ingredients: '',
    image_url: '',
  });

  useEffect(() => {
    axios
      .get("https://mocktea.onrender.com/products")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products", error));
  }, []);

   /**
   * used to set NewProduct from the input boxes
   * @param {*} e an item from the input boxes in create new product
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  /**
   * Adds product to the database taking in from newProduct
   */
  const addNewProduct = () => {
    // Validate inputs as necessary before sending
    axios
      .post("https://mocktea.onrender.com/products", newProduct)
      .then((response) => {
        // Add the new product to the products state
        setProducts([...products, response.data]);
        // Close the popup
        setButtonPopup(false);
        // Reset the new product state if needed
        setNewProduct({ name: '', price: '', ingredients: '' });
      })
      .catch((error) => console.error("Error adding product", error));
  };

    /**
   * takes in the input from the input and gives it to the DeleteItemId 
   * @param {*} e the id from the input box for delete input
   */
  const handleDeleteInputChange = (e) => {
    setDeletedItemId(e.target.value);
  };
  /**
   * deletes Products from the data base its unique id
   */
  const deleteProduct = () => {
    const itemIdToDelete = Number(deletedItemId); // Convert to number
  
    axios
      .delete(`https://mocktea.onrender.com/products/${itemIdToDelete}`)
      .then(() => {
        setProducts(products.filter((product) => product.id !== itemIdToDelete));
        setDeletePopup(false);
        setDeletedItemId('');
      })
      .catch((error) => console.error("Error deleting product", error));
  };
  
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditProductDetails({ ...editProductDetails, [name]: value });
  };


  


  const fetchProductToEdit = (id) => {
    // Fetch the product details by ID or find it in the existing state
    const productToEdit = products.find((product) => product.id === Number(id));
    if (productToEdit) {
      setEditProductDetails(productToEdit);
    }
  };

  useEffect(() => {
    if (editPopup) {
      fetchProductToEdit(editItemId);
    }
  }, [editPopup, editItemId, products]);

  const updateProduct = () => {
    // Validate inputs as necessary before sending
    axios
      .put(`https://mocktea.onrender.com/products/${editItemId}`, editProductDetails)
      .then((response) => {
        // Update the products state with the updated product details
        setProducts(products.map((product) => (product.id === Number(editItemId) ? response.data : product)));
        // Close the popup
        setEditPopup(false);
      })
      .catch((error) => console.error("Error updating product", error));
  };



  return (
    <div className="centered-container-menu">
      <h1>Menu</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Ingredients</th>
            <th>Image URL</th>
            {/* Add more headings as per your product data structure */}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.ingredients}</td>
              <td>{product.image_url}</td>
              {console.log(product)}
            </tr>
          ))}
        </tbody>
      </table>
      <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
        <br/>
          <h3>Add New Menu Item</h3>
          Item Name: <input name="name" value={newProduct.name} onChange={handleInputChange}/>
          Price: <input name="price" value={newProduct.price} onChange={handleInputChange}/>
          Ingredients: <input name="ingredients" value={newProduct.ingredients} onChange={handleInputChange}/>
          Image URL: <input name="image_url" value={newProduct.image_url} onChange={handleInputChange} />
          <br/>
          <button className='popI' onClick={addNewProduct}>Enter</button>
      </Popup>

      <Popup trigger={deletePopup} setTrigger={setDeletePopup}>
      <br/>
        <h3>Delete Menu Item</h3>
        Item ID: <input value={deletedItemId} onChange={handleDeleteInputChange}/>
        <br/>
        <button className='popI'  onClick={deleteProduct}>Enter</button>
      </Popup>

      <Popup trigger={editPopup} setTrigger={setEditPopup}>
        <br />
        <h3>Edit Menu Item</h3>
        Enter ID of Item to be Edited: <input value={editItemId} onChange={(e) => setEditItemId(e.target.value)} onBlur={() => fetchProductToEdit(editItemId)} />
        <h3>Fill Out Fields You Wish to Edit</h3>
        Name: <input name="name" value={editProductDetails.name} onChange={handleEditInputChange} />
        Price: <input name="price" value={editProductDetails.price} onChange={handleEditInputChange} />
        Ingredients: <input name="ingredients" value={editProductDetails.ingredients} onChange={handleEditInputChange} />
        Image URL: <input name="image_url" value={editProductDetails.image_url} onChange={handleEditInputChange} />
        <br />
        <button onClick={updateProduct}>Enter</button>
      </Popup>


      <br />
      <br />
      <button className='pop' onClick={() => setButtonPopup(true)}>Add New Menu Item</button>
      <br />
      <button className='pop' onClick={() => setDeletePopup(true)}>Delete Menu Item</button>
      <br />
      <button className="pop" onClick={() => setEditPopup(true)}>Edit Menu Item</button>
    </div>
  );
}
