import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import AxiosInstance from "../AxiosInstance";
import useAuth from "../hooks/useAuth";
import theme from "../theme";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.primary};
  color: ${(props) => props.theme.white};
`;

const CenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Text = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  text-transform: uppercase;
`;
const Circle = styled.div``;

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

const Bottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2.5rem;
  background-color: ${(props) => props.theme.primaryLight};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  padding: 1rem 2rem;
  background: ${(props) => (props.bgColor ? props.bgColor : "gray")};
  outline: none;
  border: none;
  font-size: 1.4rem;
  font-weight: 400;
  color: ${(props) => (props.color ? props.color : "black")};
  border-radius: 0.5rem;
  margin: 1rem 0;
  text-transform: uppercase;
  cursor: pointer;
  margin-right: 1rem;
`;

const DeviceScreen = () => {
  const [devices, setDevices] = useState([]);
  const { user, logOut } = useAuth();

  const getDevices = async () => {
    const resp = await AxiosInstance.get("/devices");
    setDevices(resp.data.devices);
  };

  const notify = async () => {
    const data = {
      name: "Shafiul Azim",
      email: "shafiulmizbah2@gmail.com",
      repoUrl: "https://github.com/Shafiulmizbah2/meldcx_test",
      message: "Hope you would be happy with my solution.",
    };

    await AxiosInstance.post("/notify", data);
  };

  useEffect(() => {
    getDevices();
    const timer = setInterval(() => {
      getDevices();
    }, 5000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  if (devices.length === 0) {
    return (
      <Container>
        <CenterDiv>
          <Text>Please wait...</Text>
        </CenterDiv>
      </Container>
    );
  }

  return (
    <Container>
      <OrbitContainer>
        <Orbit radius={200} numOfElement={devices.length} circleSize={20}>
          {devices.map((item) => (
            <Circle key={item.id} />
          ))}
        </Orbit>
        <CenterDiv>
          <Text style={{ fontSize: "3rem", fontWeight: 300 }}>
            {devices.length}
          </Text>
          <Text>Device</Text>
          <Text>Online</Text>
        </CenterDiv>
      </OrbitContainer>

      <Bottom>
        <Button color={theme.secondary} bgColor={theme.white} onClick={notify}>
          Notify
        </Button>
        <Button color={theme.white} bgColor={theme.secondary} onClick={logOut}>
          Log out
        </Button>
      </Bottom>
    </Container>
  );
};

export default DeviceScreen;
