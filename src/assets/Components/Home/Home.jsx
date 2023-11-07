import { useState, useEffect } from 'react'
import './Home.css'
// import { NavBar } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import { Header } from '../Header/Header';

function LogIn() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleLogIn = () => {
        // Implement your login logic here
        console.log('Logging in with Username:', username, 'Password:', password);
    };

    const handleClear = () => {
        setUsername('');
        setPassword('');
    };

    return (
        <div className='login_container'>
            <div className='username'>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                />
            </div>
            <div className='password'>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
            </div>
            <div className='buttons'>
                <button onClick={handleLogIn}>Log In</button>
                <button onClick={handleClear}>Clear</button>
            </div>
        </div>
    );
}


function Home() {
    const [loginVisible, setLoginVisible] = useState(false);

    const toggleLogin = () => {
        setLoginVisible(!loginVisible);
    };

    return (
        <div>
            <div className='header_part'>
                <Header/>
            </div>
            <div className='body'>
                <div className='container'>
                    <div className='big_logo'>
                        <h1>WELCOME TO SHARE TEA</h1>
                    </div>
                    <div className='button-container'>
                        <button onClick={toggleLogin}>Log In</button>
                        <button>Start Ordering</button>
                    </div>
                    {loginVisible && (
                        <div className='login-area'>
                            <LogIn />
                        </div>
                    )}
                </div>
            </div>
        </div>

    )
}
export default Home
export {LogIn}

