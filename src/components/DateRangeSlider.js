// src/components/DateRangeSlider.js
import React from "react";
import styled from "styled-components";

const Slider = styled.input`
  width: 100%;
  margin: 20px 0;
`;

const DateRangeSlider = ({ min, max, value, onChange }) => (
  <Slider type="range" min={min} max={max} value={value} onChange={onChange} />
);

export default DateRangeSlider;
