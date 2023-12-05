import React from 'react'
import { Link, Outlet } from "react-router-dom";
import './Navbar.css'

export const Navbar = () => {
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
