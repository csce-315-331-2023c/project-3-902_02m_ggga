import { useState, useEffect } from 'react'
import React  from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Login.css'
import CustomerInput from './CustomerInput';
import axios from 'axios';
import { prodArray } from './productArray';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import { NavBar } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
//import GitHubOAuth from '../backend/githubOAuth'
const CLIENT_ID = "c1e2a3c233d9b16112ee";

function LogIn() {
    const GithubLogIn = () => {
        window.location.assign("https://github.com/oauth/authorize?client_id="+ CLIENT_ID);
    };
        /*const [username, setUsername] = useState('');
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
        const handleGitHubAuthhSuccess = (token) => {
            console.log('Github authentication token:', token);
        };
        return (
            <div>
                    <h1>
                        Welcome to the cashier
                    </h1>
                    <GitHubOAuth onAuthSuccess={handleGitHubAuthhSuccess} />
            </div>
        );
    };

    const handleClear = () => {
        setUsername('');
        setPassword('');
    };
    return (
        <div className='LogIn'>
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
                { <button>home</button> }
                <Link to="home"><button>Back</button></Link>
            </div>
        </div>
    );*/
    
    return (
        <div className='LogIn'>
            <header className='buttons'>
                <button onClick={GithubLogIn}>
                    Login with Github
                </button>
            </header>
        </div>
    )
};
export default LogIn