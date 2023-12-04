import { useState, useEffect } from 'react'
import './Cashier.css'
// import './AccessibleCashier.css'
import axios from "axios";
import { prodArray } from '../productArray';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import { NavBar } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import { Header } from '../Header/Header';
import { Accessibility } from '../Accessibility/Accessibility'


function populateButtons(handleClick) {
    function populateButtons(handleClick) {
        const [products, setProducts] = useState([]);

        useEffect(() => {
            axios
                .get("http://localhost:5000/api/products")
                .then((response) => setProducts(response.data))
                .catch((error) => console.error("Error fetching products", error));
        }, []);

        const order_buttons = products.map((product, i) => {
            return (
                <button
                    key={i}
                    className='grid-button'
                    onClick={() => handleClick(product.name, product.price)}
                >
                    {product.name}
                </button>
            );
        });

        return (order_buttons)
    }
}
export const Cashier = () => {

    // here I have all my states and handlers
    const [currentView, setCurrentView] = useState("");
    const [selectedButton, setSelectedButton] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0.0);
    const [name, setName] = useState("empty");
    const [selectedLabels, setSelectedLabels] = useState([]);
    const [cart, setCart] = useState([]);
    const [currentProd, setCurrentProd] = useState({ name: "", qty: 1, price: 0.0, ingredients: [] });
    const [orderPrice, setOrderPrice] = useState(0.0);
    const [totalPrice, setTotalPrice] = useState(0.0);
    const ingredients_array = [];
    const [maxOrderId, setMaxOrderId] = useState(null);



    const handleLabelChange = (label) => {
        if (label === 'clearAll') {
            // Clear all selected labels
            setSelectedLabels([])
            setSelectedButton("")
            setCart([]);
            setOrderPrice(0.0);
            setTotalPrice(0.0);
            setPrice(0.0);
            setQuantity(1);
            setCurrentProd({
                name: "empty",
                quantity: 1,
                price: 0.0,
                ingredients: []
            })
        } else if (selectedLabels.includes(label)) {
            // If the item is selected, then we will remove it
            setSelectedLabels(selectedLabels.filter((selectedLabel) => selectedLabel !== label));
            setQuantity(currentProd.qty);
            setName(currentProd.name);
            setPrice(currentProd.price);
            // setSelectedLabels(selectedLabels.filter(item => item !== label));
            // setCurrentProd({
            //     name: name,
            //     qty: quantity,
            //     price: currentProd.price,
            //     ingredients: [...currentProd.ingredients, ...selectedLabels]
            // })
        } else {
            // If the item was not selected, then we will add it
            setSelectedLabels([...selectedLabels, label]);
            // setCurrentProd({
            //     name: currentProd.name,
            //     qty: currentProd.quantity,
            //     price: currentProd.price,
            //     ingredients: [...currentProd.ingredients, ...selectedLabels]
            // })
        }

        // setCurrentProd({ name: selectedButton, qty: quantity, price: price, ingredients: selectedLabels });
    };

    const handleClear = () => {
        // Create a new object with all checkboxes set to false
        const clearedCheckboxes = {};
        for (const key in checkboxState) {
            clearedCheckboxes[key] = false;
        }
        setCheckboxState(clearedCheckboxes);
    };

    // const handleCartChange = () => {
    //     // setCurrentProd({
    //     //     name: selectedButton,
    //     //     qty: quantity,
    //     //     price: totalPrice,
    //     //     ingredients: selectedLabels
    //     // })]
    //     // `${selectedButton} ${selectedLabels.length == 0 ? "" : "(" + selectedLabels + ")"}`
    //     const newProduct = { name: `${selectedButton} ${selectedLabels.length == 0 ? "" : "(" + selectedLabels + ")"}`, qty: quantity, price: totalPrice, ingredients: selectedLabels };
    //     setCart([...cart, newProduct]);
    //     //update the entire order price by adding the current drinks price to the old sum
    //     console.log("updated cart with ", { newProduct });
    //     setOrderPrice((Number(totalPrice) + Number(orderPrice)).toFixed(2));
    //     setQuantity(1)
    // }

    const handleCartChange = () => {
        // Check if the quantity is greater than 0
        if (quantity > 0) {
            // Iterate based on the quantity
            for (let i = 0; i < quantity; i++) {
                const product = ingredients_array.find(product => product.name === selectedButton);
                const current_ingredients = product.ingredients;
                console.log(current_ingredients);
                const newProduct = {
                    name: `${selectedButton}${selectedLabels.length === 0 ? "" : "(" + selectedLabels + ")"}`,
                    qty: 1, // Set quantity to 1 for each iteration
                    price: price, //using unit price
                    ingredients: current_ingredients
                };

                // Add the product to the cart
                setCart(prevCart => [...prevCart, newProduct]);

                // Update the order price by adding the current drink's price to the old sum
                setOrderPrice((Number(totalPrice) + Number(orderPrice)).toFixed(2));
                console.log("Updated cart with", { newProduct });

            }

            // Reset the quantity to 1
            setQuantity(1);

            // Log information about the updated cart
        }
    };




    // updating the maximum order ID
    useEffect(() => {
        axios
            .get("https://mocktea.onrender.com/orderid")
            .then((response) => setMaxOrderId(response.data))
            .catch((error) => console.error("Error fetching max order ID", error));
    }, []);


    const placeOrder = async () => {

        const orderData = {
            orderID: maxOrderId + 1,
            tip: 0,
            price: orderPrice,
            order_date: new Date().toLocaleDateString(),
            order_time: new Date().toLocaleTimeString(),
            items: [cart.map((item) => item.name).join(', ')]
        };

        try {
            for (let i = 0; i < cart.length; i++) {
                const product = cart[i];
                const curr_ing_array = product.ingredients.split(",");
                curr_ing_array.forEach(async (ingredient) => {
                    let quantityQuery = 1;
                    if (
                        (product.name.toLowerCase().includes("extra boba") && ingredient == 1) || (product.name.toLowerCase().includes("extra boba") && ingredient == 7)
                    ) {
                        quantityQuery = 2;
                    }
                    if (
                        (product.name.toLowerCase().includes("extra sugar") && ingredient == 10)
                    ) {
                        quantityQuery = 2;
                    }
                    if (
                        (product.name.toLowerCase().includes("extra milk") && ingredient == 20)
                    ) {
                        quantityQuery = 2;
                    }
                    try {
                        await axios.post("https://mocktea.onrender.com/neworderinventory",
                            { quan: quantityQuery, id: ingredient },
                            {
                                headers: { "Content-Type": "application/json" },
                            });
                        console.log("ingredients posted to the db: ", ingredient);
                    }
                    catch (error) {
                        console.error("error processing ingredient", error);
                    }

                });
            }
            // console.log(orderData);
            await axios.post(
                "https://mocktea.onrender.com/neworder",
                orderData,
                { headers: { "Content-Type": "application/json" } }
            );
            console.log("Order placed successfully:");
            setCart([]);
            setOrderPrice(0);
            handleLabelChange("clearAll");

        }
        catch (error) {
            console.error("Error placing order", error);
        }
        // cart current holds all the things in the cart
    };


    const handleQuantityChange = (e) => {
        // Update the quantity state with the input value
        // Update the quantity state with the input value
        const newQuantity = parseInt(e.target.value, 10);
        setQuantity(newQuantity);
        const new_price = price * newQuantity;
        setTotalPrice(new_price);
        setCurrentProd({
            name: selectedButton,
            qty: quantity, price: totalPrice, ingredients: selectedLabels
        });
    };

    // when a button is clicked, the attribtues are then passed in.
    // this function will then set the current products attributes to what is pressed
    const handleButtonClick = (buttonName, btn_price) => {
        setSelectedButton(buttonName);
        setPrice(btn_price);
        setTotalPrice(btn_price * quantity);
    }
    const handleViewChange = (view) => {
        setCurrentView(view);
    }

    //populating the button

    const buttons_array = populateButtons(handleButtonClick);//unneeded as of right now
    const top_labels = ["No Milk ", "No Sugar ", "No Boba "]
    const bottom_labels = ["Extra Milk ", "Extra Sugar ", "Extra Boba "]

    // -------------populating buttons-----------------
    const [products_from_db, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get("https://mocktea.onrender.com/products")
            .then((response) => setProducts(response.data))
            .catch((error) => console.error("Error fetching products in cashier", error));
    }, []);



    products_from_db.map((product) => (
        ingredients_array.push({ name: product.name, ingredients: product.ingredients })
    ))


    const toggleStyle = (element, styleName, value) => {
        // const currentStyle = document.style[styleName];
        const chosenStyle = element.style[styleName];
        // document.body.style[styleName] = currentStyle ? "" : value;
        // document.documentElement.style[styleName] = currentStyle ? "" : value;
        element.style[styleName] = chosenStyle ? "" : value;
    };

    // const [currentView, setCurrentView] = useState("");

    // const handleViewChange = (view) => {
    //     setCurrentView(view);
    // }
    const handleAccessibilityOption = (option) => {
        const enlarge = document.querySelector(".selectedAttributes");
        const checkbox = document.querySelector(".checkbox_container");
        const modLabel = document.querySelector(".order_mods");
        const quant = document.querySelector(".quant_label");
        const menuTitle = document.querySelector(".menu-title");
        const leftSide = document.querySelector(".place_left_side");
        const table = document.querySelector(".orders_table");
        const tableLabels = document.querySelectorAll(".table .table_label");
        const tableText = document.querySelectorAll(".table .table_entry");
        const orderButtons = document.querySelector(".order_placing_btns");
        const pastOrders = document.querySelector(".past_orders");
        // console.log(tableLabels); // Check if it's not null or undefined
        // console.log(tableEntries); // Check if it's not null or undefined
        const rightSide = document.querySelector(".place_right_side");
        switch (option) {
            case "biggerText":
                // toggleStyle(modLabel, "font-size", "1.3rem");
                // toggleStyle(pastOrders, "font-size", "2rem");
                toggleStyle(leftSide, "font-size", "1.3rem");
                toggleStyle(rightSide, "font-size", "1.5rem");
                toggleStyle(quant, "font-size", "1.5rem");
                tableLabels.forEach((label) => {
                    toggleStyle(label, "font-size", "1.5rem");
                });
                tableText.forEach((entry) => {
                    toggleStyle(entry, "font-size", "1.3rem");
                });
                break;
            case "highContrast":
                toggleStyle(leftSide, "background-color", "#000");
                toggleStyle(leftSide, "color", "#fff");
                toggleStyle(rightSide, "color", "#fff");
                toggleStyle(rightSide, "background-color", "#000");
                toggleStyle(menuTitle, "color", "#fff");
                tableLabels.forEach((label) => {
                    toggleStyle(label, "color", "#fff");
                    toggleStyle(label, "background-color", "#000");

                });
                tableText.forEach((entry) => {
                    toggleStyle(entry, "color", "#fff");
                    toggleStyle(entry, "background-color", "#000");
                });
                break;
            case "legibleText":
                toggleStyle(leftSide, "font-family", "Times New Roman, Times, serif");
                toggleStyle(rightSide, "font-family", "Times New Roman, Times, serif");
                tableLabels.forEach((label) => {
                    toggleStyle(label, "font-family", "Times New Roman, Times, serif");
                });
                tableText.forEach((entry) => {
                    toggleStyle(entry, "font-family", "Times New Roman, Times, serif");
                });
                break;
            default:
                document.documentElement.style.fontSize = "";
                document.documentElement.style.backgroundColor = "";
                document.documentElement.style.color = "";
                document.documentElement.style.cursor = "";
        }
    };
    // console.log(ingredients_array);



    return (
        <div className='page_container' >
            <div><Accessibility onOptionClick={handleAccessibilityOption} /></div>

            <div className='placeorders_page'>
                {/* <p>hello test</p> */}
                <div className='place_left_side'>
                    <h1 className='menu-title'>Menu Items</h1>
                    <div className='grid-container'>
                        {products_from_db.map((product) => (
                            <button
                                key={product.name}
                                className="grid-button"
                                onClick={() => handleButtonClick(product.name, product.price)}
                            >
                                <div className="product-info">
                                    <div>{product.name}</div>
                                    <div>${product.price}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
                <div className='place_right_side'>
                    <div className='order_mods'>
                        <div className='quantity_label'>
                            <label className='quant_label'>
                                Quantity:
                                <input
                                    type="number"
                                    id="quantityInput"
                                    onChange={handleQuantityChange}
                                />
                            </label>

                            <p>Quantity: {quantity} </p>
                        </div>
                        <div className='checkbox_container'>
                            <label className='mod_label'>Modifications: </label>
                            <Form className='horizontal_checks'>
                                {top_labels.map((label, index) => (
                                    <div key={index} className="mb-3">
                                        <Form.Check
                                            inline
                                            label={label}
                                            name="group1"
                                            type="checkbox"
                                            checked={selectedLabels.includes(label)} // Ensure correct checked status
                                            onChange={() => handleLabelChange(label)}
                                        />
                                    </div>
                                ))}
                            </Form>
                            <Form className='horizontal_checks'>
                                {bottom_labels.map((label, index) => (
                                    <div key={index} className="mb-3">
                                        <Form.Check
                                            inline
                                            label={label}
                                            name="group1"
                                            type="checkbox"
                                            checked={selectedLabels.includes(label)} // Ensure correct checked status
                                            onChange={() => handleLabelChange(label)}
                                        />
                                    </div>
                                ))}
                            </Form>
                        </div>

                    </div>
                    <div className='selectedAttributes'>
                        <div className='acc_div'>
                            <div className='row_box'>
                                <h1>Selected Item: {selectedButton} </h1>
                                <h1>Price per Item: {price}</h1>
                            </div>
                            <div className='row_box'>
                                <h1>Total price: {totalPrice.toFixed(2)}</h1>
                                <h1>Ingredients: {selectedLabels} </h1>
                            </div>
                            <div className='row_box'>
                                <h1>Quantity: {quantity} </h1>
                                <h1>Mods:{selectedLabels}</h1>
                            </div>
                        </div>
                        <h1>Cart:</h1>
                        <ul>
                            {cart.map((item, index) => (
                                <li key={index}>
                                    <p>Name: {item.name} ({quantity})</p>
                                    <p>Price: {item.price}</p>
                                    <p>Quantity: {item.qty}</p>
                                    <p>Ingredients: {item.ingredients}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <DenseTable data={cart} />
                    <h1 id='order_price_header'>Order Price: {orderPrice} </h1>
                    <div className='order_placing_btns'>
                        <button onClick={() => handleCartChange()}> Add to Cart</button>
                        <button onClick={() => handleLabelChange("clearAll")}>Clear</button>
                        <button onClick={() => placeOrder()}>Place Orders</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
function DenseTable({ data }) {
    return (
        <TableContainer component={Paper}>
            <Table className='table' sx={{ minWidth: 630 }} size="medium" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell className='table_label'>Product</TableCell>
                        <TableCell className='table_label'>Quantity</TableCell>
                        <TableCell className='table_label'>Modifications</TableCell>
                        <TableCell className='table_label'>Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row" className='table_entry'>
                                {row.name}
                            </TableCell>
                            <TableCell className='table_entry'>{row.qty}</TableCell>
                            <TableCell className='table_entry'>{row.ingredients}</TableCell>
                            <TableCell className='table_entry'>{row.price}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function ViewOrders() {

}
function PlaceOrders() {

}

// function Cashier() {
//     return (
//         <Navbar bg="light" data-bs-theme="light">
//             <Container>
//                 <Navbar.Brand className="me-auto" href="#home">Share Tea</Navbar.Brand>
//                 <Nav className="me-auto">
//                     <Nav.Link href="#test">Home</Nav.Link>
//                     <Nav.Link href="#features">Features</Nav.Link>
//                     <Nav.Link href="#pricing">Pricing</Nav.Link>
//                 </Nav>
//             </Container>
//         </Navbar>
//     );


// }
export default Cashier;