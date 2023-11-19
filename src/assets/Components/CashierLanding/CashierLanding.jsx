// import { useState } from 'react'
import { Cashier } from '../Cashier/Cashier'
import { Home } from '../Home/Home'
import { Header as Header } from '../Header/Header'
import { ViewOrders } from '../ViewOrders/ViewOrders'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './CashierLanding.css'
import { NavLink, Outlet } from 'react-router-dom'



export const CashierLanding = () => {
    return (
        <div>
            {/* <Header/> */}

            <Outlet/>

        </div>
    //   <div className="cashier_landing">
    //     <Routes>
    //       <Route index element={<Header />}></Route>
    //       <Route path="placeorder" element={<Cashier />}></Route>
    //       <Route path="vieworder" element={<ViewOrders />}></Route>
    //       <Route path="home" element={<Home />}></Route>
    //     </Routes>
    //   </div>

    );
};

export default CashierLanding