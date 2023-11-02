import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Cashier.css'
import CustomerInput from './CustomerInput';
import axios from 'axios';

const prodArray = [
    {
        id: "1",
        name: "milk tea",
        price: 4.99,
        ingredients: ["milk, ", "other stuff "]
    },
    {
        id: "2",
        name: "green tea",
        price: 3.2,
        ingredients: []
    },
    {
        id: "3",
        name: "ice tea",
        price: 8.4,
        ingredients: []
    },
    {
        id: "4",
        name: "black tea",
        price: 3.49,
        ingredients: []
    },
    {
        id: "6",
        name: "smoothie",
        price: 5.01,
        ingredients: []
    },
    {
        id: "7",
        name: "icecream",
        price: 100,
        ingredients: []
    },

]

function getProductData(id) {
    let productData = prodArray.find(product => product.id === id)

    if (productData == undefined) {
        console.log("product data is not found " + id);
        return productData
    }
    return productData;

}

export {prodArray};