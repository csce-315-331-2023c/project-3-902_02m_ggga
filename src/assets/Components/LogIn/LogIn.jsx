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
    //const [isManager, setManager] = useState(false);
    //const [isEmployee, setEmployee] = useState(true);
    const [userPrivleges, setPrivleges] = useState([]);
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

    async function checkPrivleges(gitId) {
        try {
            checkManager(gitId);
        }
        catch(error) {
            console.log("Not employee");
            setEmployee(false);
        }
    }

    async function checkManager(internalUser) {
        fetch ("http://localhost:5000/employees?gitid="+ internalUser.id, {
            method: "GET",
        }).then((response) => {
            setPrivleges("Not current employee. Please log out or contact your supervisor");
            return response.json();
        }).then((data) => {
            console.log("git id" + internalUser.id);
            console.log(data.manager);
            if (data.manager === true) {
                setPrivleges(<><body>Welcome {internalUser.name}!</body><button>Manager</button><Link to='/CashierLanding'><button>Cashier</button></Link></>)
                console.log('This user is a manager.');
                // Perform actions for a manager user
            } else {
                setPrivleges(<><body>Welcome {internalUser.name}!</body><Link to='/CashierLanding'><button>Cashier</button></Link></>)
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
            checkManager(data)
        })
    }

    return (
        <div className='LogIn'>
            <div className='home_header'>
                <Navbar />
            </div>
                <div className='body'>
                    {localStorage.getItem("accessToken") ?
                        <><body>
                            {Object.keys(userData).length !== 0 ?
                            <>  
                                {userPrivleges}
                            </>
                            :
                            <>
                                <body>An error occured while logging in. please retry logging in and if that doesnt work contact an employee</body>
                            </>}

                        </body>
                        <button onClick={() => {localStorage.clear("accessToken"); setRerender(!rerender);}}>log out</button>
                        </>
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
