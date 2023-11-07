import { useState, useEffect } from 'react'
import './Home.css'
// import { NavBar } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import { Header } from '../Header/Header';
import {Link} from 'react-router-dom'


export const Home = () => {
    // initially sets log in as false so not visible
    const [loginVisible, setLoginVisible] = useState(false);

    // sets if log in is visible or not
    const toggleLogin = () => {
        setLoginVisible(!loginVisible);
    };

    return (
        <div>
            <div className='header_part'>
                <nav className='header'>
                    <div className='sharetea_header'>
                        ShareTea
                    </div>
                    <ul className='links'>
                        <li >Log In</li>
                        <li > Menu </li>
                        <li> Start Order</li>
                        <li> Contact</li>
                        <li>Cashier</li>
                    </ul>
                </nav>
            </div>
            <div className='body'>
                <div className='container'>
                    <div className='big_logo'>
                        <h1>WELCOME TO SHARE TEA</h1>
                    </div>
                    <div className='button-container'>
                        <button className='home_buttons' onClick={toggleLogin}>Log In</button>
                        <button className='home_buttons' >Start Ordering</button>
                    </div>
                    {loginVisible && (
                        <div className='login-area'>
                            <LogIn />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// function LogIn() {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');

//     const handleUsernameChange = (e) => {
//         setUsername(e.target.value);
//     };

//     const handlePasswordChange = (e) => {
//         setPassword(e.target.value);
//     };

//     const handleLogIn = () => {
//         // Implement your login logic here
//         console.log('Logging in with Username:', username, 'Password:', password);
//     };

//     const handleClear = () => {
//         setUsername('');
//         setPassword('');
//     };

//     return (
//         <div className='login_container'>
//             <div className='username'>
//                 <label>Username:</label>
//                 <input
//                     type="text"
//                     value={username}
//                     onChange={handleUsernameChange}
//                 />
//             </div>
//             <div className='password'>
//                 <label>Password:</label>
//                 <input
//                     type="password"
//                     value={password}
//                     onChange={handlePasswordChange}
//                 />
//             </div>
//             <div className='button'>
//                 <button onClick={handleLogIn}>Log In</button>
//                 <button onClick={handleClear}>Clear</button>
//             </div>
//         </div>
//     );
// }

// export default Home
