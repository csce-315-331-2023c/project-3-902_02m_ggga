import { useState, useEffect } from 'react'
import './Home.css'
// import { NavBar } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import { Header } from '../Header/Header';
import { Navbar as Navbar } from '../Navbar';
import {Outlet, Link} from 'react-router-dom';


export const Home = () => {
    // initially sets log in as false so not visible
    // const [loginVisible, setLoginVisible] = useState(false);

    // // sets if log in is visible or not
    // const toggleLogin = () => {
    //     setLoginVisible(!loginVisible);
    // };
    return (
        <div>
            <div className='home_header'>
                <Navbar />
            </div>
            <div className='body'>
            {/* <div id="google_translate_element"></div>
            <p>translate this site into your prefered language</p>
            <script type="text/javascript">
                function googleTranslateElementInit() {
                    new google.translate.TranslateElement(
                    {pageLanguage: 'en'},
                    'google_translate_element'
                    )};
            </script>
            <script type="text/javascript"
                src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit">
            </script> */}
                <div className='container'>
                    <div className='big_logo'>
                        <h1>WELCOME TO SHARE TEA</h1>
                    </div>
                    <div className='button-container'>
                        <button className='home_buttons'>Log In</button>
                        <Link to='/Customer'><button className='home_buttons' >Start Ordering</button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
};


