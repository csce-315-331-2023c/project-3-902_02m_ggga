import { useState, useEffect } from 'react'
import CustomerInput from '../CustomerInput';
import axios from 'axios';

const [products, setProducts] = useState([]);

useEffect(() => {
    axios
        .get("http://localhost:5000/api/products")
        .then((response) => setProducts(response.data))
        .catch((error) => console.error("Error fetching products", error));
}, []);


const prodArray = products;

function getProductData(id) {
    let productData = prodArray.find(product => product.id === id)

    if (productData == undefined) {
        console.log("product data is not found " + id);
        return productData
    }
    return productData;

}

export { prodArray };