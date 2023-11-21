import { useState, useEffect } from 'react'
import React from 'react'
import './LogIn.css'
import { Link } from 'react-router-dom';


const CLIENT_ID = "c1e2a3c233d9b16112ee";

export const LogIn = () =>  {
    const GithubLogIn = () => {
        window.location.assign("https://github.com/login/oauth/authorize?client_id="+ CLIENT_ID);
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
                <button onClick={GithubLogIn}>
                    Login with Github
                </button>
            </header>
        </div>
    );
}
