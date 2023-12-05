import React from 'react';
import './App.css';
import { Navbar as Navbar } from './assets/Components/Nav/Navbar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DataAnalytics as DataAnalytics } from './assets/Components/Data/DataAnalytics';
import { Inventory as Inventory } from './assets/Components/Inventory/Inventory';
import { Employees as Employees } from './assets/Components/Employees/Employees';
import { Menu as Menu } from './assets/Components/Menu/Menu';
import { Settings as Settings } from './assets/Components/Settings/Settings';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/Data" element={<DataAnalytics/ >} />
          <Route path="/Inventory" element={<Inventory/>}/>
          <Route path="/Employees" element={<Employees />}/>
          <Route path="/Menu" element={<Menu />}/>
          <Route path="/Settings" element={<Settings/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
