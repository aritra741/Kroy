import React from "react";
import styled from "styled-components";
import { BrandLogo } from "../brandLogo";
import { Button } from "../../components/button";
import { Link, Route, Switch } from "react-router-dom";
import { Marginer } from "../marginer";
const NavbarContainer = styled.div`
  width: 100%;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5em;
  background-color: ${({ useTransparent }) =>
    useTransparent ? "transparent" : "#264653"};
`;

const AccessibilityContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AnchorLink = styled.a`
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  text-decoration: none;
  outline: none;
  transition: all 200ms ease-in-out;
  &:hover {
    filter: contrast(0.6);
  }
`;

const Seperator = styled.div`
  min-height: 35%;
  width: 1px;
  background-color: #fff;
`;

export function Navbar(props) {
  const { useTransparent } = props;
  return (
    <NavbarContainer useTransparent={useTransparent}>
      <BrandLogo />
      <AccessibilityContainer>
        <Link to="/customer/access/signin">
          <Button size={19}> Login as teacher </Button>
        </Link>
        <Marginer direction="horizontal" margin={6} />
        <Link to="/customer/access/signin">
          <Button size={19}> Login as student</Button>
         
        </Link>
        <Marginer direction="horizontal" margin={6} />
        <Link to="/customer/access/signup">
          <AnchorLink>Register</AnchorLink>
        </Link>
      </AccessibilityContainer>
    </NavbarContainer>
  );
}
