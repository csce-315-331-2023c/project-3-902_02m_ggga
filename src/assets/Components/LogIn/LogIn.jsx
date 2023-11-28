import { useState, useEffect } from 'react'
import React from 'react'
import './LogIn.css'
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
                {localStorage.getItem("accessToken") ?
                    <b>
                        you are logged in!
                        <button onClick={() => {localStorage.clear("accessToken"); setRerender(!rerender);}}>log out</button>
                        {Object.keys(userData).length !== 0 ?
                        <>
                            <b>Hey there {userData.login}</b>
                        </>
                        :
                        <>
                        </>}
                    </b>
                :
                    <button onClick={loginWithGithub}>
                    Login with Github
                    </button>
                }
        </div>
    );
}

export default LogIn;
