import { useState, useEffect } from 'react'
import './Header.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/Switch';
import { Link } from "react-router-dom";
import { NavLink, Outlet } from 'react-router-dom';
import headerImage from "/src/assets/Components/ShareTea_Header.png";
import { Accessibility } from '../Accessibility/Accessibility'
import { right } from '@popperjs/core';

export const Header = () => {

    const toggleStyle = (element, styleName, value) => {
        // const currentStyle = document.style[styleName];
        const chosenStyle = element.style[styleName];
        // document.body.style[styleName] = currentStyle ? "" : value;
        // document.documentElement.style[styleName] = currentStyle ? "" : value;
        element.style[styleName] = chosenStyle ? "" : value;
    };

    // const [currentView, setCurrentView] = useState("");

    // const handleViewChange = (view) => {
    //     setCurrentView(view);
    // }
    const handleAccessibilityOption = (option) => {
        const enlarge = document.querySelector(".selectedAttributes");
        const checkbox = document.querySelector(".checkbox_container");
        const modLabel = document.querySelector(".order_mods");
        const menuTitle = document.querySelector(".menu-title");
        const leftSide = document.querySelector(".place_left_side");
        const table = document.querySelector(".table");
        const orderButtons = document.querySelector(".order_placing_btns");
        const pastOrders = document.querySelector(".past_orders");

        const rightSide = document.querySelector(".place_right_side");
        switch (option) {
            case "biggerText":
                toggleStyle(modLabel, "font-size", "1.3rem");
                // toggleStyle(pastOrders, "font-size", "2rem");
                toggleStyle(leftSide, "font-size", "1.3rem");
                toggleStyle(rightSide, "font-size", "1.5rem");
                break;
            case "highContrast":
                // toggleStyle("placeorders_page","backgroundColor", "#000");
                // toggleStyle("placeorders_page", "color", "#fff");
                // toggleStyle(enlarge, "color", "#fff");
                // toggleStyle(enlarge, "backgroundColor", "#000");
                toggleStyle(leftSide, "background-color", "#000");
                toggleStyle(leftSide, "color", "#fff");
                toggleStyle(rightSide, "color", "#fff");
                toggleStyle(rightSide, "background-color", "#000");
                // toggleStyle(modLabel, "color", "#fff");
                // toggleStyle(modLabel, "background-color", "#000");
                toggleStyle(menuTitle, "color", "#fff");
                // toggleStyle(table, "color", "#fff");
                // toggleStyle(table, "background-color", "#fff");
                toggleStyle(pastOrders, "color", "#fff");
                toggleStyle(pastOrders, "background-color", "#000");
                // toggleStyle(orderButtons, "background-color", "#000");
                // toggleStyle(orderButtons, "color", "#fff");

                break;
            case "legibleText":
                toggleStyle(rightSide, "font-family", "Times New Roman, Times, serif");
                toggleStyle(leftSide, "font-family", "Times New Roman, Times, serif");
                toggleStyle(modLabel, "font-family", "Times New Roman, Times, serif");
                break;
            default:
                document.documentElement.style.fontSize = "";
                document.documentElement.style.backgroundColor = "";
                document.documentElement.style.color = "";
                document.documentElement.style.cursor = "";
        }
    };

    const toggleAcc = () => {
        const [currentMode, setCurrMode] = useState(false);
    }
    const handleLogOut = () => {
        localStorage.removeItem("accessToken")
    }
    return (
        <div>
            <header className='header_cashier'>
                <div className='header_left'>
                    <Link to="/home">
                        <div className="sharetea_header">
                            <img src={headerImage} alt="ShareTea" />
                        </div>
                    </Link>
                </div>
                <div className='header_right'>
                    <ul className='links'>
                        <li><Link to="/CashierLanding/vieworder">View Orders</Link></li>
                        <li><Link to='/CashierLanding/placeorder'>Place Orders</Link></li>
                        <li><Link onClick={handleLogOut} to='/' >Log Out</Link></li>
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