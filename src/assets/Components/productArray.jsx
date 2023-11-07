import { useState, useEffect } from 'react'
import CustomerInput from '../CustomerInput';
import axios from 'axios';

// const prodArray = [];

function generateProducts() {
    const [products, setProducts] = useState([]);


    useEffect(() => {
        axios
            .get("http://localhost:5000/api/products")
            .then((response) => {
                const newItem = {
                    name: response.data.name,
                    price: response.data.price,
                    ingredients: response.data.ingredients
                };
                prodArray.push(newItem)
            })
            .catch((error) => console.error("Error fetching products", error));
    }, []);


    // const prodArray = products;
    
    return (prodArray)
}


function getProductData(id) {
    let productData = prodArray.find(product => product.id === id)

    if (productData == undefined) {
        console.log("product data is not found " + id);
        return productData
    }
    return productData;

}


const prodArray = [{ "name": "Classic Green Brewed Tea", "price": "4.70" },
{ "name": "Classic Black Brewed Tea", "price": "4.70" },
{ "name": "Winter Melon Tea", "price": "4.70" }, { "name": "Oolong Green Tea", "price": "4.70" },
{ "name": "Ginger Tea", "price": "4.70" }, { "name": "Classic Milk Black Tea", "price": "4.70" },
{ "name": "Taro Pearl Milk Tea", "price": "5.90" }, { "name": "Coffee Milk Tea", "price": "5.30" },
{ "name": "QQ Happy Family Milk Tea", "price": "5.90" }, { "name": "Thai Milk Tea with Pearls", "price": "5.90" },
{ "name": "Classic Milk Oolong Tea", "price": "4.70" }, { "name": "Classic Milk Green Tea", "price": "4.70" },
{ "name": "Matcha Red Bean Milk Tea", "price": "4.70" }, { "name": "Mango Green Milk Tea", "price": "5.90" },
{ "name": "Hokkaido Pearl Milk Tea", "price": "5.75" }, { "name": "Classic Coffee", "price": "5.00" },
{ "name": "Ginger Milk Tea", "price": "5.00" }, { "name": "Mango Green Tea", "price": "5.30" },
{ "name": "Peach Tea with Aiyu Jelly", "price": "5.60" }, { "name": "Kiwi Fruit Tea with Aiyu Jelly", "price": "5.60" },
{ "name": "Strawberry Tea", "price": "5.30" }, { "name": "Hawaii Fruit Tea with Aiyu Jelly", "price": "5.60" },
{ "name": "Wintermelon Lemonade", "price": "5.30" }, { "name": "Peach Kiwi Tea with Aiyu Jelly", "price": "5.60" },
{ "name": "Oreo Ice Blended with Pearls", "price": "6.80" }, { "name": "Thai Tea Ice Blended with Pearls", "price": "6.80" },
{ "name": "Strawberry Ice Blended with Lychee Jelly and Ice Cream", "price": "6.80" },
{ "name": "Mango Ice Blended with Ice Cream", "price": "6.80" },
{ "name": "Taro Ice Blended with Pudding", "price": "6.80" }, { "name": "Coffee Ice Blended with Ice Cream", "price": "6.80" }, { "name": "Matcha Red Bean Ice Blended with Ice Cream", "price": "6.80" }, { "name": "Milk Tea Blended with Pearls", "price": "6.80" }, { "name": "Black Tea with Fresh Milk", "price": "5.30" }, { "name": "Cacoa Lover", "price": "5.30" }, { "name": "Matcha with Fresh Milk", "price": "5.60" }, { "name": "Winter Melon with Fresh Milk", "price": "5.30" }, { "name": "Green Tea with Fresh Milk", "price": "5.30" }, { "name": "Oolong Tea with Fresh Milk", "price": "5.30" }, { "name": "Handmade Taro Fresh Milk", "price": "6.25" }, { "name": "Test tea", "price": "6.30" }]


export { prodArray };
export default generateProducts;