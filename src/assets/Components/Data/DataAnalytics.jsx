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
  const [totalSalesData, setTotalSalesData] = useState([]); // Separate state for total sales data
  const [productSalesData, setProductSalesData] = useState([]); // Separate state for product-specific sales data

  useEffect(() => {
    axios.get("http://localhost:5000/api/sales-data")
      .then((response) => {
        setTotalSalesData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching total sales data", error);
      });
  }, []);

  const lineChartData = {
    labels: productName ? productSalesData.map(data => new Date(data.day).toLocaleDateString()) : totalSalesData.map(data => new Date(data.day).toLocaleDateString()),
    datasets: [
      {
        label: productName ? `Sales for ${productName}` : 'Total Sales',
        data: productName ? productSalesData.map(data => data.number_of_sales) : totalSalesData.map(data => data.total_sales),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const fetchTotalSalesData = () => {
    axios.get("http://localhost:5000/sales-data")
      .then((response) => {
        setTotalSalesData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching total sales data", error);
      });
  };

  const fetchProductSalesData = () => {
    axios.get(`http://localhost:5000/product-sales-data?productName=${productName}`)
      .then((response) => {
        setProductSalesData(response.data);
        console.log(response.data);
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
  );
}
