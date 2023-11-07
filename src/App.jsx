import { useState } from 'react'
import {Cashier as Cashier} from './assets/Components/Cashier/Cashier'
import {Home as Home} from './assets/Components/Home/Home'
import { Header as Header } from './assets/Components/Header/Header'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {LogIn as LogIn} from './assets/Components/LogIn/LogIn'
import { ViewOrders as ViewOrders } from './assets/Components/ViewOrders/ViewOrders'


function App() {
  // const [count, setCount] = useState(0)
  return (
    // <div className='test'>
    //   <p>hi</p>
    //   <h1>hi
    //   </h1>
    // </div>
    // <LogIn/>
    // <Home/>
    <Router>
      <div className='Cashier'>
        <Header/>
        <div className='content'>
          <Routes>
            <Route path="/view" element={<ViewOrders/>} />
            <Route path="/place" element={<Cashier/>} />
          </Routes>
        </div>
      </div>
    </Router>
    // <ViewOrders/>
    
  );
}
export default App
