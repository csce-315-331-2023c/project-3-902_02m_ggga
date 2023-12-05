import React from 'react'

import { Link } from "react-router-dom";


export const Navbar = () => {
  return (

    <div id="mySidenav" className="sidenav">
        <Link to="/Data">Business Analytics</Link>
        <Link to="/Inventory">Inventory</Link>
        <Link to="/Menu">Menu</Link>
        <Link to="/Employees">Employees</Link>
        <Link to="/Settings">Settings </Link>
        <a href="#">Logout</a>
    </div>
    
  )
}
