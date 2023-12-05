import { useState, useEffect } from 'react'
import './Home.css'
// import { NavBar } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import { Header } from '../Header/Header';
import { Navbar as Navbar } from '../Navbar';
import { Outlet, Link } from 'react-router-dom';
import headerImage from "../Header/ShareTea_Header.png";
import banner from "./sharetea_webbanner_2.png"
import Accessibility from '../Accessibility/Accessibility';


export const Home = () => {
    const googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
            {
                pageLanguage: "en",
                autoDisplay: false
            },
            "google_translate_element"
        );
    };
    useEffect(() => {
        if ((!window.google || !window.google.translate)) {
            var addScript = document.createElement("script");
            addScript.setAttribute(
                "src",
                "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
            );
            document.body.appendChild(addScript);
            window.googleTranslateElementInit = googleTranslateElementInit;
            // Cleanup function to remove the added script when component unmounts
            return () => {
                document.body.removeChild(addScript);
            };
        }
        else {
            googleTranslateElementInit();
        }
    }, []);

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
        const quant = document.querySelector(".quant_label");
        const menuTitle = document.querySelector(".menu-title");
        const leftSide = document.querySelector(".place_left_side");
        const table = document.querySelector(".orders_table");
        const tableLabels = document.querySelectorAll(".table .table_label");
        const tableText = document.querySelectorAll(".table .table_entry");
        const orderButtons = document.querySelector(".order_placing_btns");
        const pastOrders = document.querySelector(".past_orders");
        // console.log(tableLabels); // Check if it's not null or undefined
        // console.log(tableEntries); // Check if it's not null or undefined
        const rightSide = document.querySelector(".place_right_side");
        switch (option) {
            case "biggerText":
                // toggleStyle(modLabel, "font-size", "1.3rem");
                // toggleStyle(pastOrders, "font-size", "2rem");
                toggleStyle(leftSide, "font-size", "1.3rem");
                toggleStyle(rightSide, "font-size", "1.5rem");
                toggleStyle(quant, "font-size", "1.5rem");
                tableLabels.forEach((label) => {
                    toggleStyle(label, "font-size", "1.5rem");
                });
                tableText.forEach((entry) => {
                    toggleStyle(entry, "font-size", "1.3rem");
                });
                break;
            case "highContrast":
                toggleStyle(leftSide, "background-color", "#000");
                toggleStyle(leftSide, "color", "#fff");
                toggleStyle(rightSide, "color", "#fff");
                toggleStyle(rightSide, "background-color", "#000");
                toggleStyle(menuTitle, "color", "#fff");
                tableLabels.forEach((label) => {
                    toggleStyle(label, "color", "#fff");
                    toggleStyle(label, "background-color", "#000");

                });
                tableText.forEach((entry) => {
                    toggleStyle(entry, "color", "#fff");
                    toggleStyle(entry, "background-color", "#000");
                });
                break;
            case "legibleText":
                toggleStyle(leftSide, "font-family", "Times New Roman, Times, serif");
                toggleStyle(rightSide, "font-family", "Times New Roman, Times, serif");
                tableLabels.forEach((label) => {
                    toggleStyle(label, "font-family", "Times New Roman, Times, serif");
                });
                tableText.forEach((entry) => {
                    toggleStyle(entry, "font-family", "Times New Roman, Times, serif");
                });
                break;
            default:
                document.documentElement.style.fontSize = "";
                document.documentElement.style.backgroundColor = "";
                document.documentElement.style.color = "";
                document.documentElement.style.cursor = "";
        }
    };

    return (
        <div className='home_container'>
            <div className='header_page'>
                <div className='header_title'>
                    <img src={headerImage} alt="ShareTea" />
                </div>
                <div className='header_banner'>
                    <ul class="nav justify-content-center" id='lower_nav_bar'>
                        <li class="nav-item">
                            Language
                        </li>
                        <li class="nav-item">
                            Menu
                        </li>
                        <li class="nav-item">
                            <Link to='/Customer'>Start Order</Link>
                        </li>
                        <li class="nav-item">
                            <Link to='/CashierLanding'>Cashier</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="https://github.com/login/oauth/authorize?client_id=c1e2a3c233d9b16112ee">Employee</Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/Nav">Manager</Link>
                        </li>
                    </ul>
                </div>
                {/* <div>
                <Outlet />
            </div> */}
            </div>
            <div className='body_home'>
                <div className='big_logo'>
                    <h1>WELCOME TO SHARE TEA!</h1>
                </div>

                <div id="google_translate_element"></div>
                <div className='banner'>
                    <img src={banner} alt="ShareTea" />
                </div>
                <div><Accessibility onOptionClick={handleAccessibilityOption} /></div>

                <div className="home_text">
                    <p>Sharetea serves delivious bubble tea globally.</p>
                    <p>Established in 1992 in Taiwan, we strive to create high quality drinks with fresh ingredients.</p>
                </div>
                <div className='button-container-home'>
                    <button className='home_button'> <Link to='/Customer'> Start Order</Link></button>
                </div>
            </div>
        </div>
    );
};




{/* <div className='button-container'>
<button className='home_buttons'>Log In</button>
<Link to='/Customer'><button className='home_buttons' >Start Ordering</button></Link>
<br/>
<div id="google_translate_element"></div>
</div> */}


