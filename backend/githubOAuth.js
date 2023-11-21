import React from 'react';
import OAuth from 'react-oauth';

const CLIENT_ID = "c1e2a3c233d9b16112ee";

function loginWithGithub() {
    window.location.assign("https://github.com/oauth/authorize?client_id="+ CLIENT_ID);
}
