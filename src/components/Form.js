import styled from "styled-components";

const Container = styled.form`
  width: 30%;
  min-width: 35rem;
  padding: 1rem 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${(props) => props.theme.white};
  border-radius: 1rem;
`;

const Title = styled.h4`
  display: block;
  padding: 0.5rem;
  margin-bottom: 1.5rem;
  font-weight: 300;
  font-size: 4rem;
  text-transform: capitalize;
`;

const FormInputContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  border-radius: 0.3rem;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const InputLabel = styled.label`
  margin-bottom: 0.7rem;
  font-weight: 400;
  font-size: 1.6rem;
  text-transform: capitalize;
  align-self: flex-start;
  margin-left: 5%;
  color: ${(props) =>
    props.labelDanger ? props.theme.danger : props.theme.black};
`;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background: ${(props) => props.theme.gray};
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 1rem;
  background: transparent;
  outline: none;
  border: none;
  font-size: inherit;
  font-weight: inherit;
  color: ${(props) => props.theme.black};

  ::placeholder,
  ::-webkit-input-placeholder {
    text-transform: capitalize;
  }
  :-ms-input-placeholder {
    text-transform: capitalize;
  }
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
  width: ${(props) => (props.fullWidth ? "90%" : "auto")};
  margin: 1rem 0;
  text-transform: uppercase;
  cursor: pointer;
`;

const Form = ({ children }) => {
  return <Container>{children}</Container>;
};

Form.Title = ({ title, ...rest }) => {
  return <Title {...rest}>{title}</Title>;
};

Form.Label = ({ label, labelDanger, ...rest }) => {
  return <InputLabel labelDanger={labelDanger}>{label}</InputLabel>;
};

Form.Input = ({ Icon, label, labelDanger, ...rest }) => {
  return (
    <FormInputContainer>
      {label && <Form.Label label={label} labelDanger={labelDanger} />}
      <InputContainer>
        {Icon && <IconContainer>{Icon}</IconContainer>}
        <Input {...rest} />
      </InputContainer>
    </FormInputContainer>
  );
};

Form.Button = ({ text, bgColor, color, fullWidth, ...rest }) => {
  return (
    <Button bgColor={bgColor} color={color} fullWidth={fullWidth} {...rest}>
      {text}
    </Button>
  );
};

export default Form;
