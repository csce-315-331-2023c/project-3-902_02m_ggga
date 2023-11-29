import React from 'react'
import { Link } from 'react-router-dom';
import "./Home/Home.css"
import {NavLink, Outlet} from 'react-router-dom'



export const Navbar = () => {
    //const CLIENT_ID = "c1e2a3c233d9b16112ee";
    //OAuthLink = "https://github.com/login/oauth/authorize?client_id="+ CLIENT_ID;
    return (
        <div className='header_part'>
            <nav className='header'>
                <div className='sharetea_header'>
                    <Link to='/'>ShareTea</Link>
                </div>
                <ul className='links'>
                    <li>Menu</li>
                    {/*<li><Link to = '/menu'>Menu</Link></li>*/}
                    <li> <Link to='/Customer'>Start Order</Link></li>
                    <li><Link to='/CashierLanding'>Cashier</Link></li>
                    <li ><Link to="https://github.com/login/oauth/authorize?client_id=c1e2a3c233d9b16112ee" >Employee</Link></li>
                    {/*log in auth -> button prompts for cashier or manager with privelege levels ->cashier or manager*/}
                    {/*<li><Link to='/manager'>Manager</Link></li>*/}
                    <li> Contact</li>
                </ul>

            </nav>
            <Outlet />
        </div>
    )
}