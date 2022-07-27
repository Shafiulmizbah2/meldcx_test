import React, { useEffect } from "react";
import styled, { css } from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.white};
`;

const CenterText = styled.div``;
const Circle = styled.div`
  //   z-index: 1000;
`;

const OrbitContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  //   background: ${(props) => props.theme.black};
  position: relative;
  padding: 1em;
`;

const Orbit = styled.div`
  width: ${(props) => props.radius}px;
  height: ${(props) => props.radius}px;
  border: 2px solid white;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  ${Circle} {
    width: ${(props) => props.circleSize}px;
    height: ${(props) => props.circleSize}px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.white};
    position: absolute;
    left: 50%;
    top: 50%;
    margin: ${(props) => {
      let value = props.circleSize / 2;
      return `-${value}px`;
    }};

    ${(props) => {
      let styles = "";
      let root = 0;
      let angle = 360 / props.numOfElement;

      for (let i = 0; i < props.numOfElement; i++) {
        styles += `
                    &:nth-child(${i + 1}){
                        transform: rotate(${root * 1}deg) translate(${
          props.radius / 2
        }px) rotate(${root * -1}deg);
                    }
                `;

        root += angle;
      }

      return css`
        ${styles}
      `;
    }};
    
`;

const DeviceScreen = () => {
  return (
    <Container>
      <OrbitContainer>
        <Orbit radius={200} numOfElement={1} circleSize={20}>
          <Circle />
        </Orbit>
        <CenterText>1 device</CenterText>
      </OrbitContainer>
    </Container>
  );
};

export default DeviceScreen;
