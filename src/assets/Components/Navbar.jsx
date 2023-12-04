import React from 'react'
import { Link } from 'react-router-dom';
import "./Home/Home.css"
import {NavLink, Outlet} from 'react-router-dom'


export const Navbar = () => {
    return (
        <div className='header_part'>
            <nav className='header'>
                <div className='sharetea_header'>
                    <Link to='/'>ShareTea</Link>
                </div>
                <ul className='links'>
                    <li ><Link to='/LogIn' >Log In</Link></li>
                    <li><Link to = '/menu'>Menu</Link></li>
                    <li> <Link to='/Customer'>Start Order</Link></li>
                    <li><Link to='/CashierLanding'>Cashier</Link></li>
                    {/*<li><Link to='/manager'>Manager</Link></li>*/}
                    <li> Contact</li>
                </ul>

            </nav>
            <Outlet />
        </div>
    )
}