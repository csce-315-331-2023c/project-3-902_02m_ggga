import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Cashier.css'
import CustomerInput from './CustomerInput';
import axios from 'axios';

function Test() {
  const [orders, setOrders] = useState(false);

  function getOrders() {
    fetch('http://localhost:3001')
      .then(response => {
        return response.text();
      })
      .then(data => {
        setOrders(data);
      });
  }
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div>
      {orders ? orders : 'There is no merchant data available'}
    </div>
  );

}

export default Test;