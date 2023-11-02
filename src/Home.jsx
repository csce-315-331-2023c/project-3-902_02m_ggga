import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Home.css'
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

function Home() {
    return (
        <div>
            <nav className='header'>
                <div className='sharetea_header'>
                    ShareTea
                </div>
                <ul className='links'>
                    <li > Log In</li>
                    <li > Begin Order</li>
                    <li > Menu</li>
                    <li> Contact</li>
                </ul>
            </nav>
            <div className='body'>
                <div class="container">
                    <div class="big_logo">
                        <h1>WELCOME TO SHARE TEA</h1>
                    </div>
                    <div class="button-container">
                        <button>Log In</button>
                        <button>Start Ordering</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Home