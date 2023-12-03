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


  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/sales-data")
      .then((response) => {
        setSalesData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching sales data", error);
      });
  }, []);


  const lineChartData = {
    labels: salesData.map(data => data.day.substring(0, 10)), // Just the date, not the time
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



  return (
    <div className="centered-container-data">
        <h1>Data Analytics</h1>

        <div className='chart'>
          <Line data={lineChartData} />
        </div>


    </div>
  )
}
