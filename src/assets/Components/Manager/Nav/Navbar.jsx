import React from 'react'
import { Link, Outlet } from "react-router-dom";
import './Navbar.css'

export const Navbar = () => {
  return (
    <div id="body">
    <div id="mySidenav" className="sidenav">
        <Link to="Data">Business Analytics</Link>
        <Link to="Inventory">Inventory</Link>
        <Link to="Menu">Menu</Link>
        <Link to="Employees">Employees</Link>
        <Link to="/">Logout</Link>
    </div>
    <Outlet/>
    </div>
  )
}
