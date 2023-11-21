import { useState, useEffect } from 'react'
import React from 'react'
import './LogIn.css'
import { Link } from 'react-router-dom';
import { loginWithGithub } from '../../../../backend/githubOAuth';

function LogIn()  {
    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const codeParams = urlParams.get("code");
        console.log(codeParams);
    }, []);
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
    };

    const handleClear = () => {
        setUsername('');
        setPassword('');
    };

    
    return (
        <div className='login_container'>
            <p>Log In Please</p>
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
            <div className='button'>
                <button className='login_btn' onClick={handleLogIn}>Log In</button>
                <button className='login_btn' onClick={handleClear}>Clear</button>
                <Link to="/home"><button className='login_btn'>Back</button></Link>
            </div>
        </div>
    );
}*/

    return (
        <div className='LogIn'>
            <header className='buttons'>
                <button onClick={loginWithGithub}>
                    Login with Github
                </button>
            </header>
        </div>
    );
}

export default LogIn;
