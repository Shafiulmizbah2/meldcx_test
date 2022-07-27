import React, { useState } from "react";
import styled from "styled-components";
import Form from "../components/Form";
import { FaEnvelope } from "react-icons/fa";
import { BsGearFill } from "react-icons/bs";
import theme from "../theme";
import useAuth from "../hooks/useAuth";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.secondary};
`;

const LoginScreen = () => {
  const [values, setValues] = useState({});
  const { signIn, loading, error } = useAuth();

  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn(values.email, values.password);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Title title="Login" />
        {error && <Form.Label label={error} labelDanger />}

        <Form.Input
          Icon={<FaEnvelope size={17} color="#37474F" />}
          placeholder="Email Address"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        <Form.Input
          Icon={<BsGearFill size={17} color="#37474F" />}
          placeholder="Password"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        <Form.Button
          text={loading ? "Loading..." : "Log in"}
          bgColor={loading ? theme.gray : theme.blue}
          color={loading ? theme.black : theme.white}
          type="submit"
          onClick={handleSubmit}
          disabled={loading}
        />
      </Form>
    </Container>
  );
};

export default LoginScreen;
