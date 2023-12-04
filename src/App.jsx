import { useState } from 'react'
import { Cashier as Cashier } from './assets/Components/Cashier/Cashier'
import { Translate as Translate } from './assets/Components/Translate/Translate'
import { Home as Home } from './assets/Components/Home/Home'
import { Header as Header } from './assets/Components/Header/Header'
import { BrowserRouter as Router, Routes, Route, BrowserRouter, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { LogInComp as LogIn } from './assets/Components/LogIn/LogInComp'
import { ViewOrders as ViewOrders } from './assets/Components/ViewOrders/ViewOrders'
import { Navbar as Navbar } from './assets/Components/Navbar';
import { Customer } from './assets/Components/Customer/Customer';
import { CashierLanding as CashierLanding } from './assets/Components/CashierLanding/CashierLanding'
import {NavbarM as Nav} from './assets/Components/Nav/NavbarM';
import { DataAnalytics as Data } from './assets/Components/Data/DataAnalytics';
import { Inventory as Inventory } from './assets/Components/Inventory/Inventory';
import { Employees as Employees } from './assets/Components/Employees/Employees';
import { Menu as Menu } from './assets/Components/Menu/Menu';

import { RadioGroup } from '@mui/material'

function App() {
  const [isAccessible, setAccessible] = useState(false);
  return (
    <div className="App">
      <Router>
        {/* <Navbar /> */}
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="/home" element={<Home />} />
          <Route path="/LogIn" element={<LogIn />}>
            <Route path="home" element={<Home />}></Route>
          </Route>
          <Route path="/Customer" element={<Customer />} />
          <Route path="/CashierLanding" element={<Header />}>
            {/* child routes of cashierlanding */}
            <Route path="vieworder" element={<ViewOrders />}></Route>
            <Route path="placeorder" element={<Cashier />}></Route>
            <Route path="home" element={<Home />}></Route>
          </Route>
          {/*Anything under nav path is manager*/}
          <Route path="/Manager" element={<Nav />}>
            <Route path="data" element={<Data />}></Route>
            <Route path="inventory" element={<Inventory/>}></Route>
            <Route path="menu" element={<Menu />}></Route>
            <Route path="employees" element={<Employees />}></Route>
            <Route path="home" element={<Home />}></Route>
          </Route>
        </Routes>
      </Router>
    </div>

  );
};
export default App;
