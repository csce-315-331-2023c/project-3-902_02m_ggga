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


export const ViewOrders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5001/api/pastorders")
        .then((response) => setOrders(response.data))
        .catch((error) => console.error("Error getting past orders", error));
    }, []);

    return(
        <div className='past_orders'>
            <h1>Past 20 Orders</h1>
            <DenseTable data={orders}/>
        </div>
    )
}
function DenseTable({ data }) {
    return (

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Order Date</TableCell>
                        <TableCell align="right">Items</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="right">{row.price}</TableCell>
                            <TableCell align="right">{row.order_date}</TableCell>
                            <TableCell align="right">{row.items}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}