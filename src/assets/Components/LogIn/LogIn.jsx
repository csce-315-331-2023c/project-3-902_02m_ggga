import { useState, useEffect } from 'react'
import React from 'react'
import './LogIn.css'
import { Link } from 'react-router-dom';


export const LogIn = () =>  {
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
}
