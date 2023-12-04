import { useState, useEffect } from 'react'
import './Header.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/Switch';
import { Link } from "react-router-dom"
import { NavLink, Outlet } from 'react-router-dom'
// import headerImage from "./assets/ShareTea_Header.png";
import { Accessibility } from '../Accessibility/Accessibility'

export const Header = () => {

    const toggleStyle = (element, styleName, value) => {
        const currentStyle = document.body.style[styleName];
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
        switch (option) {
            case "biggerText":
                toggleStyle(modLabel,"font-size", "1.3rem");
                break;
            case "highContrast":
                // toggleStyle("placeorders_page","backgroundColor", "#000");
                // toggleStyle("placeorders_page", "color", "#fff");
                toggleStyle(enlarge, "color", "#fff"); 
                toggleStyle(enlarge, "background-color", "#000"); 
                toggleStyle(leftSide, "background-color", "#000"); 
                toggleStyle(leftSide, "color", "#000"); 
                toggleStyle(checkbox, "color", "#fff"); 
                toggleStyle(checkbox, "background-color", "#000"); 
                toggleStyle(modLabel, "color", "#fff"); 
                toggleStyle(modLabel, "background-color", "#000"); 
                toggleStyle(menuTitle, "color", "#fff"); 
                break;
            case "legibleText":
                toggleStyle(enlarge, "font-family", "Times New Roman, Times, serif");
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

    return (
        <div>
            <header className='header_cashier'>
                <div className='header_left'>
                    <div className='sharetea_header'>
                        ShareTea
                    </div>
                </div>
                <div className='header_right'>
                    <ul className='links'>
                        {/* <div className="form-switch">
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault" id='switchLabel'>Accessible View</label>
                        </div> */}
                        <li><Accessibility onOptionClick={handleAccessibilityOption} /></li>
                        <li><Link to="/CashierLanding/vieworder">View Orders</Link></li>
                        <li><Link to='/CashierLanding/placeorder'>Place Orders</Link></li>
                        <li><Link to='/home'>Log Out</Link></li>
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