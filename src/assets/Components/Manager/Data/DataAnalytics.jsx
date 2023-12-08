import React, { useState, useEffect } from 'react';
import './DataAnalytics.css'
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import Popup from './../Popup/Popup';
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



/**
 * used by the manager to look at data trends about the variety of products in their store. Can look at individual products or all products.
 * @returns the html and javascript for a funcitoning website
 */
export const DataAnalytics = () => {

  const [productName, setProductName] = useState('');
  const [totalSalesData, setTotalSalesData] = useState([]); // Separate state for total sales data
  const [productSalesData, setProductSalesData] = useState([]); // Separate state for product-specific sales data
  const [settingPopup, setSettingPopup] = useState(false);
  const [isLargeText, setIsLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  const contrastClass = highContrast ? 'high-contrast' : '';
  const fontSizeClass = isLargeText ? 'font-size-large' : 'font-size-default';
  useEffect(() => {
    axios.get("https://mocktea.onrender.com/sales-data")
      .then((response) => {
        setTotalSalesData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching total sales data", error);
      });
  }, []);
  
  const setLargeText = (value) => {
    console.log("Large text now: ", value);
    setIsLargeText(value);
  };
 


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


  const fetchProductSalesData = () => {
    axios.get(`https://mocktea.onrender.com/product-sales-data?productName=${productName}`)
      .then((response) => {
        setProductSalesData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product sales data", error);
      });
  };

  // This function will handle the form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submit action
    fetchProductSalesData();
  };

  // const toggleDarkMode = () => {
  //   document.documentElement.classList.toggle('dark-mode');
  // };


  return (
    <div className={`centered-container-data ${fontSizeClass} ${contrastClass}`}>
      <button className="access" onClick={() => setSettingPopup(true)}>
        Accessibility
      </button>
      <h1>Data Analytics</h1>

      {/* Wrap the input and button in a form */}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={productName} 
          onChange={(e) => setProductName(e.target.value)} 
          placeholder="Enter product name"
        />
        {/* Type 'submit' will trigger form submission */}
        <button type="submit">Show Sales Data for Product</button>
      </form>

      <div className='chart'>
        <Line data={lineChartData} options={{ responsive: true }} />
      </div>


      <Popup  trigger={settingPopup}  setTrigger={setSettingPopup}>
        <div className={` ${contrastClass}`}>
        <br />
        <h3 className={` ${contrastClass}`}>Accessibility Settings</h3>
        <br />
        <h2 className={` ${contrastClass}`}>Contrast</h2>
        <br></br>
        <div className={`settings-section ${contrastClass}`}>
            
            <button onClick={() => setHighContrast(true)}>High Contrast</button>
            <button onClick={() => setHighContrast(false)}>Default Contrast</button>

        </div>
        <br></br>
        <h2 className={` ${contrastClass}`}>Font Size</h2>
        <br></br>
        <div className={` settings-section ${contrastClass}`}>
           
            <button className={` ${contrastClass}`} onClick={() => setLargeText(true)}>Large</button>
            <br />
            <button className={` ${contrastClass}`} onClick={() => setLargeText(false)}>Default</button>
        </div>
        
        <h2 className={` ${contrastClass}`}>Font Type</h2>
        <br></br>
        <div className={` settings-section ${contrastClass}`}>
           
            <button>Legible</button>
            <br />
            <button>Default</button>
        </div>
        </div>

      </Popup>


      
    </div>
  );
  
}
