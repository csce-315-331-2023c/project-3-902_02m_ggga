import { useState } from 'react'
import {Cashier as Cashier} from './assets/Components/Cashier/Cashier'
import {Home as Home} from './assets/Components/Home/Home'
import { Header as Header } from './assets/Components/Header/Header'
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom";
import {LogIn as LogIn} from './assets/Components/LogIn/LogIn'
import { ViewOrders as ViewOrders } from './assets/Components/ViewOrders/ViewOrders'
import { Navbar as Navbar} from './assets/Components/Navbar';
import  Customer  from './assets/Components/Customer/Customer';


function App() {
  // const [count, setCount] = useState(0)
  return (
    // <div className='test'>
    //   <p>hi</p>
    //   <h1>hi
    //   </h1>
    // </div>
    // <LogIn/>
    <div className="App">
    <Router> 
      <Navbar/> 
      <Routes>
     <Route path="/" element={<Home/>} />
     <Route path="/LogIn" element={<LogIn/>} />
     <Route path="/Cashier" element={<Cashier/>}/>
     <Route path="/Customer" element={<Customer/>}/>
     
     </Routes>
    </Router>
    </div>

    // <Router>
    //   <div className='Cashier'>
    //     <Home/>
    //     <div className='content'>
    //       <Routes>
    //         <Route path="/login" element={<LogIn/>} />
    //         <Route path="/menu" element={<LogIn/>} />
    //         <Route path="/customer" element={<LogIn/>} /> 
    //         <Route path="/cashier" element={<Cashier/>} />
    //         <Route path="/manager" element={<LogIn/>} />
    //       </Routes>
    //     </div>
    //   </div>
    // </Router>
    // <ViewOrders/>
  );
}
export default App;
