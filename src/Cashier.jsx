import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Cashier.css'
import CustomerInput from './CustomerInput';
import axios from 'axios';
import { prodArray } from './productArray';
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



function populateButtons(handleClick) {
    const order_buttons = [];

    const products = prodArray.map

    for (let i = 0; i < prodArray.length; i++) {
        const product = prodArray[i];
        const buttonLabel = product.name; // Assuming your product object has a "name" property
        const buttonPrice = product.price;
        const buttonID = product.id;
        const buttonMods = product.ingredients;

        order_buttons.push(
            <button
                key={i}
                className='grid-button'
                onClick={() => handleClick(buttonLabel, buttonPrice, buttonMods, buttonID)}
            >
                {buttonLabel}
            </button>
        );
    }

    return order_buttons;
}
function Header() {


    // here I have all my states and handlers
    const [currentView, setCurrentView] = useState("");
    const [selectedButton, setSelectedButton] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(0.0);

    const handleInputChange = (inputValue) => {
        setQuantity(inputValue)
    }

    const handleButtonClick = (buttonName, btn_price, btn_mods, btn_ID) => {
        setSelectedButton(buttonName);
        setPrice(btn_price);

    }
    const handleViewChange = (view) => {
        setCurrentView(view);
    }

    //populating the button

    const buttons_array = populateButtons(handleButtonClick);

    return (
        <div>
            <nav className='header'>
                <div className='sharetea_header'>
                    ShareTea
                </div>
                <ul className='links'>
                    <li onClick={() => handleViewChange('viewOrders')}> View Orders</li>
                    <li onClick={() => handleViewChange('placeOrders')}>Place Orders</li>
                    <li>Log Out</li>
                </ul>
            </nav>
            {currentView === 'placeOrders' && <PlaceOrders />};
            {currentView === 'viewOrders' && <ViewOrders />};
            <div className='placeorders_page'>
                <div className='place_left_side'>
                    <h1 className='menu-title'>Menu Items</h1>
                    <div className='grid-container'>
                        {buttons_array}
                    </div>
                </div>
                <div className='place_right_side'>
                    <div className='order_mods'>
                        <div>
                            <label>Quantity</label>
                            <CustomerInput onInputChange={handleInputChange} />
                            <p>Quantity: {quantity} </p>
                        </div>
                        <div>
                            <label>Modifications</label>
                            <Form>
                                {['checkbox'].map((type) => (
                                    <div key={`inline-${type}`} className="mb-3">
                                        <Form.Check
                                            inline
                                            label="No Milk"
                                            name="group1"
                                            type={type}
                                            id={`inline-${type}-1`}
                                        />
                                        <Form.Check
                                            inline
                                            label="No Sugar"
                                            name="group1"
                                            type={type}
                                            id={`inline-${type}-2`}
                                        />
                                        <Form.Check
                                            inline
                                            label="No Boba"
                                            type={type}
                                            id={`inline-${type}-3`}
                                        />
                                    </div>
                                ))}
                            </Form>
                            <Form>
                                {['checkbox'].map((type) => (
                                    <div key={`inline-${type}`} className="mb-3">
                                        <Form.Check
                                            inline
                                            label="No Milk"
                                            name="group1"
                                            type={type}
                                            id={`inline-${type}-1`}
                                        />
                                        <Form.Check
                                            inline
                                            label="No Sugar"
                                            name="group1"
                                            type={type}
                                            id={`inline-${type}-2`}
                                        />
                                        <Form.Check
                                            inline
                                            label="No Boba"
                                            type={type}
                                            id={`inline-${type}-3`}
                                        />
                                    </div>
                                ))}
                            </Form>

                        </div>
                    </div>
                    <div className='selectedAttributes'>
                        <h1 style={{ display: 'inline' }}>Selected Item: </h1>
                        <h1 style={{ display: 'inline' }}>{selectedButton}</h1>
                        <h1>Price: {price}</h1>
                    </div>
                    <DenseTable />
                </div>
            </div>
        </div>

    );
}
function DenseTable() {
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
                    {prodArray.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.quantity}</TableCell>
                            <TableCell align="right">{row.price}</TableCell>
                            <TableCell align="right">{row.ingredients}</TableCell>
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

function Cashier() {
    return (
        <Navbar bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand className="me-auto" href="#home">Share Tea</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="#test">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );


}

export default Cashier
export { Header }