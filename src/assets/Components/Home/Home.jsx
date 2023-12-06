import { useState, useEffect } from 'react'
import './Home.css'
// import { NavBar } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import { Header } from '../Header/Header';
import { Navbar as Navbar } from '../Navbar';
import { Outlet, Link } from 'react-router-dom';
import headerImage from "../ShareTea_header.png";
import banner from "./sharetea_webbanner_2.png"
import Accessibility from '../Accessibility/Accessibility';

/**
 * 
 * @returns returns the home page with built in navigation bar
 */
export const Home = () => {

    /**
     * Calls the google translate element to switch the page into the language the user chooses
     */
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

    /**
 * the toggleStyle function is called within the handleAccessibilityOption function below.
 * This grabs the element we want to change, finds the value fo the stylename we want to change, then sets it using the value we input.
 * If there it will either be the updated accessibility value, or the default value that is grabs at the initialization of the function
 * @param {*} element 
 * @param {*} styleName 
 * @param {*} value 
 */

    const toggleStyle = (element, styleName, value) => {
        // const currentStyle = document.style[styleName];
        const chosenStyle = element.style[styleName];
        // document.body.style[styleName] = currentStyle ? "" : value;
        // document.documentElement.style[styleName] = currentStyle ? "" : value;
        element.style[styleName] = chosenStyle ? "" : value;
    };

    // const [currentView, setCurrentView] = useState("");

    /**
  * The handleAccessibilityOption takes in an option that is selected using the Accessibility object. 
  * The option is either bigger text, high contrast, or legible text
  * Depending on which option is selected, the function will update the appropriate document elements that are defined at the start of the function
  * It will then call toggleStyle on the correct elements and change the style. 
  * Accessibility options can stack.
  * @param {*} option 
  */
    const handleAccessibilityOption = (option) => {
        const enlarge = document.querySelector(".selectedAttributes");
        const banner_background = document.querySelector(".header_banner");
        const background = document.querySelector(".body_home");
        const menu_option = document.querySelectorAll(".header_banner .nav-item");
        const menu_optionlist = document.querySelectorAll(".header_banner .nav-item a");
        const title = document.querySelector(".big_logo h1");
        const home_text = document.querySelectorAll(".home_text p");
        const button_home = document.querySelector(".button-container-home .home_button");
        const button_home_text = document.querySelector(".button-container-home .home_button a");
        switch (option) {
            case "biggerText":
                menu_option.forEach((option) => {
                    toggleStyle(option, "font-size", "3rem");
                })
                menu_optionlist.forEach((list) => {
                    toggleStyle(list, "font-size", "3rem");
                })
                toggleStyle(title, "font-size", "5rem")
                home_text.forEach((text) => {
                    toggleStyle(text, "font-size", "40px");
                })
                toggleStyle(button_home, "font-size", "4rem");
                toggleStyle(button_home, "width", "500px");
                break;
            case "highContrast":
                toggleStyle(banner_background, "background-color", "#000");
                toggleStyle(background, "background-color", "#000");
                toggleStyle(title, "color", "#fff");
                toggleStyle(button_home, "background-color", "#fff");
                toggleStyle(button_home_text, "color", "#000");
                home_text.forEach((text) => {
                    toggleStyle(text, "color", "#fff");
                })
                break;
            case "legibleText":
                menu_option.forEach((label) => {
                    toggleStyle(label, "font-family", "Times New Roman, Times, serif");
                });
                menu_optionlist.forEach((entry) => {
                    toggleStyle(entry, "font-family", "Times New Roman, Times, serif");
                });
                home_text.forEach((text) => {
                    toggleStyle(text, "font-family", "Times New Roman, Times, serif");
                });

                toggleStyle(title, "font-family", "Times New Roman, Times, serif");
                toggleStyle(button_home_text, "font-family", "Times New Roman, Times, serif");
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
                            Menu
                        </li>
                        <li class="nav-item">
                            <Link to='/Customer'>Start Order</Link>
                        </li>
                        {/*<li class="nav-item">
                            <Link to='/CashierLanding'>Cashier</Link>
    </li>*/}
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


