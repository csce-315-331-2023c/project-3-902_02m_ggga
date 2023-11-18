import { useState, useEffect } from 'react'
import './Header.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link} from "react-router-dom"
export const Header = () => {

    // const [currentView, setCurrentView] = useState("");
    
    // const handleViewChange = (view) => {
    //     setCurrentView(view);
    // }

    return (
        <nav className='header'>
            <div className='sharetea_header'>
                ShareTea
            </div>
            <ul className='links'>
                <li><Link to ="/vieworder">View Orders</Link></li>
                <li><Link to = '/placeorder'>Place Orders</Link></li>
                {/* <li onClick={() => handleViewChange('viewOrders')}> View Orders</li>
                <li onClick={() => handleViewChange('placeOrders')}>Place Orders</li> */}
                <li><Link to = '/logout'>Log Out</Link></li>
            </ul>
        </nav>
    )

}