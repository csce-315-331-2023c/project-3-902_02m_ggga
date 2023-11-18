import { useState } from 'react'
import { Cashier as Cashier } from './assets/Components/Cashier/Cashier'
import { Home as Home } from './assets/Components/Home/Home'
import { Header as Header } from './assets/Components/Header/Header'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import { LogIn as LogIn } from './assets/Components/LogIn/LogIn'
import { ViewOrders as ViewOrders } from './assets/Components/ViewOrders/ViewOrders'
import CustomerInput from './assets/CustomerInput';
import { Navbar as Navbar } from './assets/Components/Navbar';
import { CustomerComp } from './assets/Components/Customer/CustomerComp';
import { CashierLanding as CashierLanding } from './assets/Components/CashierLanding/CashierLanding'


function App() {
  // const [count, setCount] = useState(0)
  return (
    // <div className='test'>
    //   <p>hi</p>
    //   <h1>hi
    //   </h1>
    // </div>
    // <LogIn/>

    // <CashierLanding/>
    // <Cashier/>
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/Cashier" element={<Cashier />} />
          <Route path="/Customer" element={<CustomerComp />} />
        </Routes>
      </Router>
    </div>

  );
}
export default App;
