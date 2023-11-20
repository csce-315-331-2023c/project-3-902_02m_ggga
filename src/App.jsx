import { useState } from 'react'
import { Cashier as Cashier } from './assets/Components/Cashier/Cashier'
import { Home as Home } from './assets/Components/Home/Home'
import { Header as Header } from './assets/Components/Header/Header'
import { BrowserRouter as Router, Routes, Route, BrowserRouter, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { LogIn as LogIn } from './assets/Components/LogIn/LogIn'
import { ViewOrders as ViewOrders } from './assets/Components/ViewOrders/ViewOrders'
import CustomerInput from './assets/CustomerInput';
import { Navbar as Navbar } from './assets/Components/Navbar';
import { CustomerComp } from './assets/Components/Customer/CustomerComp';
import { CashierLanding as CashierLanding } from './assets/Components/CashierLanding/CashierLanding'

function App() {
  // const [count, setCount] = useState(0)
  return (

    <CashierLanding/>
    // <Cashier/>
    // <Header />
    


    // <div className="App">
    //   <Router>
    //     {/* <Navbar /> */}
    //     <Routes>
    //       <Route index element={<Home />}></Route>
    //       <Route path="/home" element={<Home />} />
    //       <Route path="/LogIn" element={<LogIn />}> 
    //         <Route path="home" element={<Home/>}></Route>
    //       </Route>

    //       <Route path="/CashierLanding/" element={<CashierLanding/>}>
    //         {/* child routes of cashierlanding */}
    //         <Route path="vieworder" element={<ViewOrders />}></Route>
    //         <Route path="placeorder" element={<Cashier />}></Route>
    //         <Route path="home" element={<Home />}></Route>
    //       </Route>

    //       <Route path="/Customer" element={<CustomerComp />} />
    //     </Routes>
    //   </Router>
    // </div>

  );
};
export default App;
