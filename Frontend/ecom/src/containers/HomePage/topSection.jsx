import styled from "styled-components";
import TopSectionBackgroundImg from "../../images/landing-page.jpg";
import IllusImg from "../../images/illustration.png";
import { BrandLogo } from "../../components/brandLogo";
import { Marginer } from "../../components/marginer";
import { Button } from "../../components/button";
import { Link, Route, Switch } from "react-router-dom";
const TopSectionContainer = styled.div`
  width: 100%;
  height: 50%;
  background: url(${TopSectionBackgroundImg}) no-repeat;
  background-position: 0px -150px;
  background-size: cover;
`;

const BackgroundFilter = styled.div`
  width: 100%;
  height: 50%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
`;

const TopSectionInnerContainer = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
const StandoutImage = styled.div`
  width: 25em;
  height: 20em;
  img {
    width: 50%;
    height: 50%;
    margin-left: 300px;
    margin-top: 50px;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
`;

const SloganText = styled.h3`
  margin: 0;
  line-height: 1.4;
  color: #fff;
  font-weight: 500;
  font-size: 35px;
`;

export function TopSection(props) {
  const { children} = props; 
  return (
    <TopSectionContainer>
      <BackgroundFilter>
        {children}
        <TopSectionInnerContainer>
          <LogoContainer>
            <BrandLogo logoSize ={100} textSize= {50}> </BrandLogo>
            <SloganText>Buy your items efficiently!</SloganText>
            <Marginer direction="vertical" margin = {15}/>
            { localStorage.getItem('user')==null && (<Link to="/customer/access/signup">
            <Button>Join Now</Button>
            </Link>) }
          </LogoContainer>
          <StandoutImage>
            <img src={IllusImg} alt="illus" />
          </StandoutImage>
        </TopSectionInnerContainer>
      </BackgroundFilter>
    </TopSectionContainer>
  );
}
