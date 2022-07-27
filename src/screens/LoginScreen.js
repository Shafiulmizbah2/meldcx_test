import React from "react";
import styled from "styled-components";
import Form from "../components/Form";
import { FaEnvelope } from "react-icons/fa";
import { BsGearFill } from "react-icons/bs";
import theme from "../theme";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.secondary};
`;

const LoginScreen = () => {
  return (
    <Container>
      <Form>
        <Form.Title title="Login" />
        <Form.Input
          Icon={<FaEnvelope size={17} color="#37474F" />}
          placeholder="Email Address"
          type="email"
        />
        <Form.Input
          Icon={<BsGearFill size={17} color="#37474F" />}
          placeholder="Password"
          type="password"
        />
        <Form.Button
          text="Log in"
          bgColor={theme.blue}
          color={theme.white}
          fullWidth
          onClick={() => console.log("hello")}
        />
      </Form>
    </Container>
  );
};

export default LoginScreen;
