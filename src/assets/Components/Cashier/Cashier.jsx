import { useState, useEffect } from 'react'
import './Cashier.css'
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
    const [selectedLabels, setSelectedLabels] = useState([]);
    const [cart, setCart] = useState([]);
    const [currentProd, setCurrentProd] = useState({ name: "", qty: 1, price: 0.0, ingredients: [] });
    const [totalPrice, setTotalPrice] = useState(0.0);

    const handleLabelChange = (label) => {
        if (label === 'clearAll') {
            // Clear all selected labels
            setSelectedLabels([]);
            setCart([])
            setTotalPrice(0.0)
            setQuantity(1)
        } else if (selectedLabels.includes(label)) {
            // If the item is selected, then we will remove it
            setSelectedLabels(selectedLabels.filter(item => item !== label));
            setCurrentProd({
                name: currentProd.name,
                quantity: currentProd.quantity,
                price: currentProd.price,
                ingredients: currentProd.ingredients +  selectedLabels
            })
        } else {
            // If the item was not selected, then we will add it
            setSelectedLabels([...selectedLabels, label]);
            setCurrentProd({
                name: currentProd.name,
                quantity: currentProd.quantity,
                price: currentProd.price,
                ingredients: currentProd.ingredients + selectedLabels
            })
        }

        setCurrentProd({ name: selectedButton, qty: quantity, price: price, ingredients: selectedLabels });
    };

    const handleClear = () => {
        // Create a new object with all checkboxes set to false
        const clearedCheckboxes = {};
        for (const key in checkboxState) {
            clearedCheckboxes[key] = false;
        }
        setCheckboxState(clearedCheckboxes);
    };

    const handleCartChange = () => {
        setCart([...cart, currentProd])
        setTotalPrice(Number(totalPrice) + Number(currentProd.price))
        // setQuantity(1)
    }

    const handleQuantityChange = (e) => {
        // Update the quantity state with the input value
        setQuantity(e.target.value);
        setCurrentProd({
            name: currentProd.name,
            qty: e.target.value, price: currentProd.price, ingredients: currentProd.ingredients
        });
    };

    // when a button is clicked, the attribtues are then passed in.
    // this function will then set the current products attributes to what is pressed
    const handleButtonClick = (buttonName, btn_price) => {
        setSelectedButton(buttonName);
        setPrice(btn_price);
        setCurrentProd({
            name: buttonName,
            qty: quantity,
            price: btn_price,
            ingredients: selectedLabels
        })
    }
    const handleViewChange = (view) => {
        setCurrentView(view);
    }

    //populating the button

    const buttons_array = populateButtons(handleButtonClick);//unneeded as of right now
    const top_labels = ["No Milk ", "No Sugar ", "No Boba "]
    const bottom_labels = ["Extra Milk ", "Extra Sugar ", "Extra Boba "]

    // -------------populating buttons-----------------
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:5000/api/products")
            .then((response) => setProducts(response.data))
            .catch((error) => console.error("Error fetching products", error));
    }, []);

    return (
        <div >
            <div className='header'>
                <Header />
            </div>
            {currentView === 'placeOrders' && <PlaceOrders />};
            {currentView === 'viewOrders' && <ViewOrders />};
            <div className='placeorders_page'>
                <div className='place_left_side'>
                    <h1 className='menu-title'>Menu Items</h1>
                    <div className='grid-container'>
                        {prodArray.map((product) => (
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
                        <div>
                            <label className='quant_label'>Quantity</label>
                            <input
                                type="number"
                                onChange={handleQuantityChange}
                            />
                            <p>Quantity: {quantity} </p>

                        </div>
                        <div>
                            <label className='mod_label'>Modifications</label>
                            {/* forms made using boostrap */}
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
                            <p>Mods: {selectedLabels} </p>

                        </div>
                    </div>
                    <div className='selectedAttributes'>
                        <h1>Selected Item: {currentProd.name} </h1>
                        <h1>Price: {currentProd.price}</h1>
                        <h1>Cart:</h1>
                        <ul>
                            {cart.map((item) => (
                                <li key={item.id}>
                                    <p>Name: {item.name}</p>
                                    <p>Price: {item.price}</p>
                                    <p>Quantity: {item.qty}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <DenseTable data={cart} />
                    <h1>Total Price: {totalPrice} </h1>
                    <div className='order_placing_btns'>
                        <button onClick={() => handleCartChange()}> Add to Cart</button>
                        <button onClick={() => handleLabelChange("clearAll")}>Clear</button>
                        <button>Place Orders</button>
                    </div>
                </div>
            </div>
        </div>

    );
}
function DenseTable({ data }) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Modifications</TableCell>
                        <TableCell align="right">Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.qty}</TableCell>
                            <TableCell align="right">{row.ingredients}</TableCell>
                            <TableCell align="right">{row.price}</TableCell>
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