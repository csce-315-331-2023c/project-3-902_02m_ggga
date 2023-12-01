// import { useState } from 'react'
import { Cashier } from '../Cashier/Cashier'
import { Home } from '../Home/Home'
import { Header as Header } from '../Header/Header'
import { ViewOrders } from '../ViewOrders/ViewOrders'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './CashierLanding.css'


export const CashierLanding = () => {

    return (
        <div>
            <Header/>
        </div>
        // <Router>
        // //     <Header />
        // //     <Routes>
        // //         {/* <Route path="/" element={<Header />} /> */}
        // //         <Route index element={<Header />}></Route>
        // //         <Route path="/CashierLanding/placeorder" element={<Cashier />} />
        // //         <Route path="/CashierLanding/vieworder" element={<ViewOrders />} />
        // //         <Route path="/home" element={<Home />} />
        // //     </Routes>
        // // </Router> 
    )

}

export default CashierLanding

{/* <Router>
{/* <Header /> */}
// {/* <Routes>
//     {/* <Route path="/" element={<Header />} /> */}
//     <Route index element = {<Header />}></Route>
//     <Route path="/CashierLanding/placeorder" element={<Cashier />} />
//     <Route path="/CashierLanding/vieworder" element={<ViewOrders />} />
//     <Route path="/home" element={<Home />} />
// </Routes>
// </Router> */} */}