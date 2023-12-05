import React, { useState, useEffect } from 'react';
import './DataAnalytics.css'
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);




export const DataAnalytics = () => {

  const [productName, setProductName] = useState('');
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/sales-data")
      .then((response) => {
        setSalesData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sales data", error);
      });
  }, []);


  const lineChartData = {
    labels: salesData.map(data => new Date(data.day).toLocaleDateString()), // Assuming 'day' is in a date-compatible format
    datasets: [
      {
        label: 'Total Sales',
        data: salesData.map(data => data.total_sales),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };


  const fetchTotalSalesData = () => {
    axios.get("http://localhost:5000/api/sales-data")
      .then((response) => {
        setSalesData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching total sales data", error);
      });
  };



  const fetchProductSalesData = () => {
    axios.get(`http://localhost:5000/api/product-sales-data?productName=${productName}`)
      .then((response) => {
        setSalesData(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error("Error fetching product sales data", error);
      });
  };

  useEffect(() => {
    fetchTotalSalesData();
  }, []);


  return (
  
    <div className="centered-container-data">
      <h1>Data Analytics</h1>

      <input 
        type="text" 
        value={productName} 
        onChange={(e) => setProductName(e.target.value)} 
        placeholder="Enter product name"
      />
      <button onClick={fetchProductSalesData}>Show Sales Data for Product</button>

      <div className='chart'>
        <Line data={lineChartData} options={{ responsive: true }} />
        
      </div>
    </div>
    )
  
}
