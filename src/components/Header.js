// src/components/Header.js
import React from "react";
import styled from "styled-components";

const HeaderContainer = styled.header`
  text-align: center;
  margin-bottom: 20px;
`;

const Header = () => (
  <HeaderContainer>
    <h1>Weather Dashboard</h1>
    <p>Explore weather trends and data for different cities.</p>
  </HeaderContainer>
);

export default Header;
