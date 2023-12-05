import React from 'react'
import { Link } from 'react-router-dom';
import "./Navbar.css"
import { NavLink, Outlet } from 'react-router-dom'
import headerImage from "../Components/Header/ShareTea_Header.png";

/**
 * creates the navigation bar for the home menu
 * @returns the nav bar for home
 */
export const Navbar = () => {
    return (
        <div className='header_page'>
            <div className='header_title'>
                <img src={headerImage} alt="ShareTea" />
            </div>
            <div className='header'>
                <ul class="nav justify-content-center" id='lower_nav_bar'>
                    <li class="nav-item">
                        Menu
                    </li>
                    <li class="nav-item">
                        <Link to='/Customer'>Start Order</Link>
                    </li>
                    {/*<li class="nav-item">
                        <Link to='/CashierLanding'>Cashier</Link>
                    </li>
    */}
                    <li class="nav-item">
                        <Link to="https://github.com/login/oauth/authorize?client_id=c1e2a3c233d9b16112ee">Employee</Link>
                    </li>
                    {/*<li class="nav-item">
                        <Link to="/Manager">Manager</Link>
</li>*/}
                </ul>
            </div>
            {/* <div>
                <Outlet />
            </div> */}
        </div>

        /* <ul className='links'>
        <li>Language</li>
        <li>Menu</li>
        <li><Link to='/Customer'>Start Order</Link></li>
        <li><Link to='/CashierLanding'>Cashier</Link></li>
        <li><Link to="https://github.com/login/oauth/authorize?client_id=c1e2a3c233d9b16112ee">Employee</Link></li>
        <li><Link to="/Nav">Manager</Link></li>
        </ul> */


        // <div className='header_part'>
        //     {/* <div className='sharetea_header'>
        //         <Link to='/'>ShareTea</Link>
        //     </div> */}
        //     <div className='header'>
        //         <ul className='links'>
        //             <li>Language</li>
        //             {/*<li><Link to = '/menu'>Menu</Link></li>*/}
        //             <li>Menu</li>
        //             <li> <Link to='/Customer'>Start Order</Link></li>
        //             <li> <Link to='/CashierLanding'>Cashier</Link></li>
        //             <li ><Link to="https://github.com/login/oauth/authorize?client_id=c1e2a3c233d9b16112ee" >Employee</Link></li>
        //             {/*log in auth -> button prompts for cashier or manager with privelege levels ->cashier or manager*/}
        //             <li><Link to="/Nav">Manager</Link></li>
        //         </ul>
        //     </div>
        //     <Outlet />
        // </div>
    )
}