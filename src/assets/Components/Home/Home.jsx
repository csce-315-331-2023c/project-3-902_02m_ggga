import { useState, useEffect } from 'react'
import './Home.css'
// import { NavBar } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import { Header } from '../Header/Header';
import { Navbar as Navbar } from '../Navbar';
import { Outlet, Link } from 'react-router-dom';
import headerImage from "../Header/ShareTea_Header.png";
import banner from "./sharetea_webbanner_2.png"


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
    // initially sets log in as false so not visible
    // const [loginVisible, setLoginVisible] = useState(false);

    // // sets if log in is visible or not
    // const toggleLogin = () => {
    //     setLoginVisible(!loginVisible);
    // };
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


