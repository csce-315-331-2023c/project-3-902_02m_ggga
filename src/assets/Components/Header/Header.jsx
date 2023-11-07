import { useState, useEffect } from 'react'
import './Header.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export const Header = () => {

    return (
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
    )

}