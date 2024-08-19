// src/components/CityDropdown.js
import React from "react";
import styled from "styled-components";

const Dropdown = styled.select`
  padding: 10px;
  margin: 20px 0;
  font-size: 16px;
`;

const CityDropdown = ({ selectedCity, onCityChange, cities }) => (
  <Dropdown value={selectedCity} onChange={onCityChange}>
    {cities.map((city, index) => (
      <option key={index} value={city}>
        {city}
      </option>
    ))}
  </Dropdown>
);

export default CityDropdown;
