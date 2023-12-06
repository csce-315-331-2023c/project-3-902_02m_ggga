import React, { useState, useEffect } from "react";
/**
 * api that checks the weather for the user in their current location
 * @returns api features from weather map
 */
const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch("https://mocktea.onrender.com/weather");
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Error fetching weather", error);
        setError("Failed to fetch weather data");
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div>
      {weatherData ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
            alt="Weather Icon"
          />
          <p style={{ marginBottom: 0 }}>
            {Math.round(weatherData.main.temp)} &deg;F
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Weather;
