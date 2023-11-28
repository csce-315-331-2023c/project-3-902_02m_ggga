
const CLIENT_ID = "c1e2a3c233d9b16112ee";
const CLIENT_SECRET = "a24ff8ff78fb3910d162c62667d21c0a336526f5";

//function used to login with github
export function loginWithGithub() {
    return window.location.assign("https://github.com/login/oauth/authorize?client_id="+ CLIENT_ID);
}

