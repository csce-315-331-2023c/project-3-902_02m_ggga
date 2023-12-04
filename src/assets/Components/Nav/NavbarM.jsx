import React from 'react'
import './NavbarM.css';
import { Link } from "react-router-dom";


export const NavbarM = () => {
  return (

    <div id="mySidenav" className="sidenav">
        <Link to="/Nav/data">Business Analytics</Link>
        <Link to="/Nav/inventory">Inventory</Link>
        <Link to="/Nav/menu">Menu</Link>
        <Link to="/Nav/employees">Employees</Link>
        <Link to='/home'>Log Out</Link>
    </div>
    
  )
}
