import { useState, useEffect } from 'react'
import React from 'react'
import './LogIn.css'
import {Navbar as Navbar} from '../Navbar';
import { Link } from 'react-router-dom';
import headerImage from "/src/assets/Components/ShareTea_Header.png";

const CLIENT_ID = "c1e2a3c233d9b16112ee";
const CLIENT_SECRET = "a24ff8ff78fb3910d162c62667d21c0a336526f5";


/**
 * 
 * @returns the javascript html for the log in feature
 */
function LogIn()  {
    //used to force rerenderr of the page
    const [rerender, setRerender] = useState(false);
    //used to collect and display user data
    const [userData, setUserData] = useState({});
    //used to check employee privleges
    const [userPrivleges, setPrivleges] = useState([]);
    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const codeParams = urlParams.get("code");
        console.log(codeParams);
        getUserData();

        //gets user data if the accesstoken does not exist
        if(codeParams && (localStorage.getItem("accessToken") === null)) {
            async function getAccessToken() {
                await fetch("https://mocktea.onrender.com/getAccessToken?code=" + codeParams, {
                    method: "GET"
                }).then((response) => {
                    return response.json();
                }).then((data) => {
                    if(data.access_token) {
                        console.log("access token: " + data.access_token);
                        localStorage.setItem("accessToken", data.access_token);
                        setRerender(!rerender);
                    }
                    else {
                        console.log("error getting acces Token");
                    }
                }).then(() => {
                    if(localStorage.getItem("accessToken" !== undefined)) {
                        getUserData();
                        checkManager(userData);
                    }
                    setRerender(!rerender);
                })
            }
            getAccessToken();
        }
    }, []);


    
    /**
     * function used to login with github
     * @returns link to github OAUTH
     */
    function loginWithGithub() {
    return window.location.assign("https://github.com/login/oauth/authorize?client_id="+ CLIENT_ID);
    }
    /**
     * checks and sets the privlege levels of the current user
     * @param {*} internalUser the data of the current user
     */
    async function checkManager(internalUser) {
        try {
            const response = await fetch("https://mocktea.onrender.com/verifyEmployee?gitid=" + internalUser.id, {
                method: "GET",
            });
    
            const data = await response.json();
            console.log("git id" + internalUser.id);
            console.log(data.manager);
    
            if (data.manager === true) {
                setPrivleges(
                    <div>
                        <body>Welcome {internalUser.name}!</body>
                        <Link to='/Manager'><button>Manager</button></Link>
                        <Link to='/CashierLanding'><button>Cashier</button></Link>
                    </div>
                );
                console.log('This user is a manager.');
                // Perform actions for a manager user
            } else {
                setPrivleges(
                    <div>
                        <body>Welcome {internalUser.name}!</body>
                        <Link to='/CashierLanding'><button>Cashier</button></Link>
                    </div>
                );
                console.log('This user is not a manager.');
                // Perform actions for a non-manager user
            }
        } catch (error) {
            console.error("Error fetching employee verification:", error);
            setPrivleges("Not a current employee. Please log out or contact your supervisor.");
        }
    }
    /*async function checkManager(internalUser) {
        try {const response = await fetch ("https://mocktea.onrender.com/verifyEmployee?gitid="+ internalUser.id, {
            method: "GET"
    });
 //.then((response) => {
        const data = await response.json();
         setPrivleges("Not current employee. Please log out or contact your supervisor");
           // return response.json();
        //}).then((data) => {
            console.log("git id" + internalUser.id);
            console.log(data.manager);
            if (data.manager === true) {
                setPrivleges(<div><body>Welcome {internalUser.name}!</body><Link to='/Manager'><button>Manager</button></Link><Link to='/CashierLanding'><button>Cashier</button></Link></div>)
                console.log('This user is a manager.');
                // Perform actions for a manager user
            } else {
                setPrivleges(<div><body>Welcome {internalUser.name}!</body><Link to='/CashierLanding'><button>Cashier</button></Link></div>)
                console.log('This user is not a manager.');
                // Perform actions for a non-manager user
            }
            return false;
        })
    }*/
    /**
     * collects user fata from the github api
     */
    async function getUserData()  {
        await fetch("https://mocktea.onrender.com/getUserData", {
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
    const handleLogOut = () => {
        localStorage.removeItem("accessToken")
    }
    return (
        <div className='LogIn'>
            <img src={headerImage} alt="ShareTea" />
                <div className='body'>
                    {localStorage.getItem("accessToken") ?
                        <div>
                            {Object.keys(userData).length !== 0 ?
                            <>  
                                {userPrivleges}
                            </>
                            :
                            <>
                                <body>An error occured while logging in. please retry logging in and if that doesnt work contact an employee</body>
                            </>}
                            <li><Link onClick={handleLogOut} to='/' ><button>Log Out</button></Link></li>
                        </div>
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
