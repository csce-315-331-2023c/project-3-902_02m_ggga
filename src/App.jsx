import { useState } from 'react'
import {Cashier as Cashier} from './assets/Components/Cashier/Cashier'
import Home, {LogIn} from './assets/Components/Home/Home'
import { Header as Header } from './assets/Components/Header/Header'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  const [count, setCount] = useState(0)
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home/>} />
         {/* <Route path="Cashier" element={<Cashier/>} /> */}
        {/* <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
export default App
