import React from 'react'
import { Link, Outlet } from "react-router-dom";
import './Navbar.css'

/**
 * creates the links, styling, and nav bar for the management page.
 * @returns the navbar for the management page
 */
export const Navbar = () => {
  /**
   * handles log outs by removing the accessToken helping prevent security issues
   */
  const handleLogOut = () => {
    localStorage.removeItem("accessToken")
}
  return (
    <div id="body">
    <div id="mySidenav" className="sidenav">
        <Link to="Data">Business Analytics</Link>
        <Link to="Inventory">Inventory</Link>
        <Link to="Menu">Menu</Link>
        <Link to="Employees">Employees</Link>
        <Link to="/" onClick={handleLogOut}>Logout</Link>
    </div>
    <Outlet/>
    </div>
  )
}
