import { useState, useEffect } from 'react'
import './ViewOrders.css'
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Header } from '../Header/Header';
import { Accessibility } from '../Accessibility/Accessibility'


export const ViewOrders = () => {
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
        const menuTitle = document.querySelector(".menu-title");
        const leftSide = document.querySelector(".place_left_side");
        const table = document.querySelector(".orders_table");
        const tableLabels = document.querySelectorAll(".orders_table .table_labels");
        const tableText = document.querySelectorAll(".orders_table .table_entry");
        const orderButtons = document.querySelector(".order_placing_btns");
        const pastOrders = document.querySelector(".past_orders");

        const rightSide = document.querySelector(".place_right_side");
        switch (option) {
            case "biggerText":
                // toggleStyle(modLabel, "font-size", "1.3rem");
                // toggleStyle(pastOrders, "font-size", "2rem");
                // toggleStyle(leftSide, "font-size", "1.3rem");
                // toggleStyle(rightSide, "font-size", "1.5rem");
                tableLabels.forEach((label) => {
                    toggleStyle(label, "font-size", "1.5rem");
                }); 
                tableText.forEach((entry) => {
                    toggleStyle(entry, "font-size", "1.3rem");
                }); 
                break;
            case "highContrast":
                // toggleStyle("placeorders_page","backgroundColor", "#000");
                // toggleStyle("placeorders_page", "color", "#fff");
                // toggleStyle(enlarge, "color", "#fff");
                // toggleStyle(enlarge, "backgroundColor", "#000");
                // toggleStyle(leftSide, "background-color", "#000");
                // toggleStyle(leftSide, "color", "#fff");
                // toggleStyle(rightSide, "color", "#fff");
                // toggleStyle(rightSide, "background-color", "#000");
                // toggleStyle(modLabel, "color", "#fff");
                // toggleStyle(modLabel, "background-color", "#000");
                // toggleStyle(menuTitle, "color", "#fff");
                toggleStyle(table, "color", "#fff");
                toggleStyle(tableLabels, "color", "#fff");
                toggleStyle(table, "background-color", "#000");
                toggleStyle(pastOrders, "color", "#fff");
                toggleStyle(pastOrders, "background-color", "#000");
                // toggleStyle(orderButtons, "background-color", "#000");
                // toggleStyle(orderButtons, "color", "#fff");

                break;
            case "legibleText":
                toggleStyle(rightSide, "font-family", "Times New Roman, Times, serif");
                toggleStyle(leftSide, "font-family", "Times New Roman, Times, serif");
                toggleStyle(modLabel, "font-family", "Times New Roman, Times, serif");
                break;
            default:
                document.documentElement.style.fontSize = "";
                document.documentElement.style.backgroundColor = "";
                document.documentElement.style.color = "";
                document.documentElement.style.cursor = "";
        }
    };
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get("https://mocktea.onrender.com/pastorders/")
            .then((response) => setOrders(response.data))
            .catch((error) => console.error("Error getting past orders", error));
    }, []);

    return (
        <div className='past_orders'>
            <div><Accessibility onOptionClick={handleAccessibilityOption} /></div>
            {/* <div className='header'>
                <Header />
            </div> */}
            <h1>Past 20 Orders</h1>
            <DenseTable data={orders} />
        </div>
    )
}
function DenseTable({ data }) {
    return (

        <TableContainer component={Paper}>
            <Table className="orders_table" sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow >
                        <TableCell className='table_labels'>ID</TableCell>
                        <TableCell className='table_labels' align="right">Price</TableCell>
                        <TableCell className='table_labels' align="right">Order Date</TableCell>
                        <TableCell className='table_labels' align="right">Items</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell className="table_entry" component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell className="table_entry" align="right">{row.price}</TableCell>
                            <TableCell className="table_entry" align="right">{row.order_date}</TableCell>
                            <TableCell className="table_entry" align="right">{row.items}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}