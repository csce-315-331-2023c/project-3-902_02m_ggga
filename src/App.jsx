import { useState } from 'react'
import { Cashier as Cashier } from './assets/Components/Cashier/Cashier'
import { Home as Home } from './assets/Components/Home/Home'
import { Header as Header } from './assets/Components/Header/Header'
import { BrowserRouter as Router, Routes, Route, BrowserRouter, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { LogInComp as LogIn } from './assets/Components/LogIn/LogInComp'
import { ViewOrders as ViewOrders } from './assets/Components/ViewOrders/ViewOrders'
import { Navbar as Navbar } from './assets/Components/Navbar';
import { Customer } from './assets/Components/Customer/Customer';
import { CashierLanding as CashierLanding } from './assets/Components/CashierLanding/CashierLanding'
import { Menu as Menu } from './assets/Components/Manager/Menu/Menu';
import { Employees as Employees } from './assets/Components/Manager/Employees/Employees';
import { Inventory as Inventory } from './assets/Components/Manager/Inventory/Inventory';
import { DataAnalytics as DataAnalytics } from './assets/Components/Manager/Data/DataAnalytics';
import { Navbar as Nav } from './assets/Components/Manager/Nav/Navbar';

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
          <Route path="/Manager" element={<Nav />}>
            {/*child routes of manager */}
            <Route path="Data" element={<DataAnalytics />} />
            <Route path="Inventory" element={<Inventory/>}/>
            <Route path="Employees" element={<Employees />}/>
            <Route path="Menu" element={<Menu />}/>
            </Route>
        </Routes>
      </Router>
    </div>

  );
};
export default App;
