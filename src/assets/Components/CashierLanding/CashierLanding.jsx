// import { useState } from 'react'
import { Cashier } from '../Cashier/Cashier'
import { Home } from '../Home/Home'
import { Header as Header } from '../Header/Header'
import { ViewOrders } from '../ViewOrders/ViewOrders'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './CashierLanding.css'


export const CashierLanding = () => {

    return (
        <div className="cashier_landing">
            <Router>
                <Header />
                <Routes>
                    <Route path="/" element={<Header />} />
                    <Route path="/placeorder" element={<Cashier />} />
                    <Route path="/vieworder" element={<ViewOrders />} />
                </Routes>
            </Router>
        </div>

    )

}