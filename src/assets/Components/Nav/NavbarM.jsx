import React from 'react'
import './NavbarM.css';
import { Link } from "react-router-dom";
import {NavLink, Outlet} from 'react-router-dom'


export const NavbarM = () => {
  return (
    <div>
        <div id="mySidenav" className="sidenav">
            <Link to="/Manager/data">Business Analytics</Link>
            <Link to="/Manager/inventory">Inventory</Link>
            <Link to="/Manager/menu">Menu</Link>
            <Link to="/Manager/employees">Employees</Link>
            <Link to='/home'>Log Out</Link>
        </div>
        <Outlet/>
    </div>
    
  )
}
