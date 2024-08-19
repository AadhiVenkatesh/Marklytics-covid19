// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Header from "./components/Header";
import CityDropdown from "./components/CityDropdown";
import DateRangeSlider from "./components/DateRangeSlider";
import WeatherChart from "./components/WeatherChart";
import GlobalStyles from "./GlobalStyles";

const AppContainer = styled.div`
  max-width: 800px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin: 20px 0;
`;

const LoadingMessage = styled.div`
  text-align: center;
  margin: 20px 0;
`;

const App = () => {
  const [cities] = useState(["London", "New York", "Tokyo", "Sydney"]);
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [weatherData, setWeatherData] = useState([]);
  const [dateRange, setDateRange] = useState([0, 7]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);

      try {
        const API_KEY = process.env.REACT_APP_OPENWEATHERMAP_API_KEY;
        console.log("API Key:", API_KEY);
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${selectedCity}&cnt=8&units=metric&appid=${API_KEY}`
        );

        const data = response.data.list.map((item) => ({
          date: item.dt_txt,
          temperature: item.main.temp,
          humidity: item.main.humidity,
        }));

        setWeatherData(data);
      } catch (err) {
        setError("Failed to fetch weather data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [selectedCity]);

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleDateRangeChange = (e) => {
    setDateRange([0, e.target.value]);
  };

  const filteredData = weatherData.slice(dateRange[0], dateRange[1]);

  return (
    <AppContainer>
      <GlobalStyles />
      <Header />
      <CityDropdown
        selectedCity={selectedCity}
        onCityChange={handleCityChange}
        cities={cities}
      />
      <DateRangeSlider
        min="0"
        max="7"
        value={dateRange[1]}
        onChange={handleDateRangeChange}
      />
      {loading && <LoadingMessage>Loading data...</LoadingMessage>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {!loading && !error && weatherData.length > 0 && (
        <>
          <WeatherChart data={filteredData} chartType="line" />
          <WeatherChart data={filteredData} chartType="bar" />
        </>
      )}
    </AppContainer>
  );
};

export default App;
