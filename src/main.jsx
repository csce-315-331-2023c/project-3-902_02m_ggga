import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Cashier, { Header } from './Cashier.jsx'
import Test from './test.jsx'
import Home, {LogIn} from './Home.jsx'
// import './index.css'
import Button from 'react-bootstrap/Button'
import "bootstrap/dist/css/bootstrap.min.css"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <Header />
    <Cashier /> */}
    {/* <Home /> */}
    <LogIn />
    
    {/* /* <Test/> */}
  </React.StrictMode>
)
