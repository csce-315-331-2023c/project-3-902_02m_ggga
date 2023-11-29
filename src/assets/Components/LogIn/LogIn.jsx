import { useState, useEffect } from 'react'
import React from 'react'
import './LogIn.css'
import {Navbar as Navbar} from '../Navbar';
import { Link } from 'react-router-dom';


const CLIENT_ID = "c1e2a3c233d9b16112ee";
const CLIENT_SECRET = "a24ff8ff78fb3910d162c62667d21c0a336526f5";



function LogIn()  {
    const [rerender, setRerender] = useState(false);
    const [userData, setUserData] = useState({});
    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const codeParams = urlParams.get("code");
        console.log(codeParams);
        getUserData();

        if(codeParams && (localStorage.getItem("accessToken") === null)) {
            async function getAccessToken() {
                await fetch("http://localhost:5000/getAccessToken?code=" + codeParams, {
                    method: "GET"
                }).then((response) => {
                    return response.json();
                }).then((data) => {
                    console.log("access token: " + data.access_token);
                    if(data.access_token) {
                        localStorage.setItem("accessToken", data.access_token);
                        //setRerender(!rerender);
                    }
                }).then(() => {
                    getUserData();
                    setRerender(!rerender);
                })
            }
            getAccessToken();
        }
    }, []);


    //function used to login with github
    function loginWithGithub() {
    return window.location.assign("https://github.com/login/oauth/authorize?client_id="+ CLIENT_ID);
    }

    function checkEmployee(gitId) {
        fetch ("http://localhost:5000/getUserData?gitid="+gitId, {
            method: "GET",
        }).then((response) => {
            return response.json();
        }).then((data) => {
            // Assuming the data received is an array of objects with a 'manager' field
            if (data.length > 0) {
                console.log('This user is an employee.');
                return true;
                // Perform actions for a manager user
            } else {
                console.log('This user is not an employee.');
                // Perform actions for a non-manager user
            }
            console.log(data)
            return false;
        })
    }

    function checkPrivleges(gitId) {
        fetch ("http://localhost:5000/getUserData?gitid="+gitId, {
            method: "GET",
        }).then((response) => {
            return response.json();
        }).then((data) => {
            // Assuming the data received is an array of objects with a 'manager' field
            if (data.length > 0 && data[0].manager === true) {
                console.log('This user is a manager.');
                return true;
                // Perform actions for a manager user
            } else {
                console.log('This user is not a manager.');
                // Perform actions for a non-manager user
            }
            return false;
        })
    }

    async function getUserData()  {
        await fetch("http://localhost:5000/getUserData", {
            method: "GET",
            headers: {
                "Authorization" : "Bearer " + localStorage.getItem("accessToken")
            }
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log("user data:" + data);
            console.log(data);
            setUserData(data);
        })
    }
    return (
        <div className='LogIn'>
            <div className='home_header'>
                <Navbar />
            </div>
                <div className='body'>
                    {localStorage.getItem("accessToken") ?
                        <body>
                            {Object.keys(userData).length !== 0 ?
                            <>  
                                {checkEmployee(userData.id) ?
                                <>
                                    <body>Welcome {userData.name}!</body>
                                    {checkPrivleges(userData.id) ?
                                        <button>Manager</button>
                                        :
                                        <></>
                                    }
                                    <Link to='/CashierLanding'><button>Cashier</button></Link>
                                </>
                                    :
                                    <body>
                                        You are not a member of the staff here.
                                    </body>
                                }
                            </>
                            :
                            <>
                                <body>An error occured while logging in. please retry logging in and if that doesnt work contact an employee</body>
                            </>}
                            <button onClick={() => {localStorage.clear("accessToken"); setRerender(!rerender);}}>log out</button>

                        </body>
                    :
                        <button onClick={loginWithGithub}>
                        Login with Github
                        </button>
                    }
                </div>
        </div>
    );
}

export default LogIn;
