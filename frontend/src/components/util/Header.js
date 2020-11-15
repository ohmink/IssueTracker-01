import React from 'react';
import styled from 'styled-components';
import { GoRepo } from 'react-icons/go';

const Box = styled.div`
  width: 100vw;
  background: #24292f;
  display: flex;
  padding-top: 30px;
  padding-bottom: 30px;
  justify-content: center;
  align-items: center;
  p {
    color: white;
    font-weight: 600;
  }
`;

const HeaderLink = styled.a`
  text-decoration: none;
  color: white;
`;

const Header = () => {

  return (
    <Box>
      <GoRepo style={{ color: 'white' }} />
      <HeaderLink href="/main">ISSUES</HeaderLink>
    </Box>
  );
};

export default Header;
