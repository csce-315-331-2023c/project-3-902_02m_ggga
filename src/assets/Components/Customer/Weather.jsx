import React, { useState, useEffect } from "react";
/**
 * api that checks the weather for the user in their current location
 * @returns api features from weather map
 */
const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const apiKey = import.meta.env.VITE_REACT_APP_WEATHER_KEY;
  const city = "college station"; 
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => setWeatherData(data))
      .catch((error) => console.error("Error fetching weather data:", error));
  }, [apiUrl]);

  return (
    <div>
      {weatherData ? (
        <div style={{display: "flex", alignItems: "center"}}>
          <img
            src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
            alt="Weather Icon"
          />
          <p style={{marginBottom: 0}}>{Math.round(weatherData.main.temp)} &deg;F</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Weather;
