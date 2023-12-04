import { useState, useEffect } from 'react'
import './Header.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/Switch';
import { Link } from "react-router-dom"
import { NavLink, Outlet } from 'react-router-dom'

export const Header = () => {

    // const [currentView, setCurrentView] = useState("");

    // const handleViewChange = (view) => {
    //     setCurrentView(view);
    // }

    const toggleAcc = () => {
        const [currentMode, setCurrMode] = useState(false);
    }

    return (
        <div>
            <header className='header_cashier'>
                <div className='header_left'>
                    <div className='sharetea_header'>
                        ShareTea
                    </div>
                </div>
                <div className='header_right'>
                    <ul className='links'>
                        <div className="form-switch">
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault" id='switchLabel'>Accessible View</label>
                        </div>
                        <li><Link to="/CashierLanding/vieworder">View Orders</Link></li>
                        <li><Link to='/CashierLanding/placeorder'>Place Orders</Link></li>
                        <li><Link to='/home'>Log Out</Link></li>
                    </ul>
                </div>

            </header>
            <div className='outlet_content'>
                {/* this section is for linkage. everything will display below the */}
                <Outlet />
            </div>
        </div>
    )

}