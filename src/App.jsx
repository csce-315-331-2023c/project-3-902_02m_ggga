import { useState } from 'react'
import {Cashier as Cashier} from './assets/Components/Cashier/Cashier'
import {Home as Home} from './assets/Components/Home/Home'
import { Header as Header } from './assets/Components/Header/Header'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {LogIn as LogIn} from './assets/Components/LogIn/LogIn'


function App() {
  // const [count, setCount] = useState(0)
  return (
    // <div className='test'>
    //   <p>hi</p>
    //   <h1>hi
    //   </h1>
    // </div>
    <Home/>
    // <BrowserRouter>
    //   <Routes>
    //     <Route index element={<Home/>} />
    //      {/* <Route path="Cashier" element={<Cashier/>} /> */}
    //     {/* <Route path="contact" element={<Contact />} />
    //     <Route path="*" element={<NoPage />} /> */}
    //   </Routes>
    // </BrowserRouter>
  );
}
export default App
