import { useState, useEffect } from 'react'
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
                    <div>
                        <CustomerInput onInputChange={handleInputChange} />
                        <p>Quantity: {quantity} </p>
                    </div>
                    <div className='selectedAttributes'>
                        <h1 style={{ display: 'inline' }}>Selected Item: </h1>
                        <h1 style={{ display: 'inline' }}>{selectedButton}</h1>
                        <h1>Price: {price}</h1>
                    </div>
                    <DenseTable/>
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
                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
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
                            <TableCell align="right">{row.calories}</TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell>
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
    // const [count, setCount] = useState(0)

    // return (
    //     <>
    //         <div>
    //             <a href="https://vitejs.dev" target="_blank">
    //                 <img src={viteLogo} className="logo" alt="Vite logo" />
    //             </a>
    //             <a href="https://react.dev" target="_blank">
    //                 <img src={reactLogo} className="logo react" alt="React logo" />
    //             </a>
    //         </div>
    //         <h1>Vite + React</h1>
    //         <div className="card">
    //             <button onClick={() => setCount((count) => count + 1)}>
    //                 count is {count}
    //             </button>
    //             <p>
    //                 Edit <code>src/App.jsx</code> and save to test HMR
    //             </p>
    //         </div>
    //         <p className="read-the-docs">
    //             Click on the Vite and React logos to learn more
    //         </p>
    //     </>
    // )
}

export default Cashier
export { Header }