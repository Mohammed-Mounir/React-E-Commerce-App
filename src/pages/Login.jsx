import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/apiCalls";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(rgba(0, 128, 128, 0.3), rgba(0, 128, 128, 0.3)),
    url("https://images.unsplash.com/photo-1517938889432-a2ac9241a486?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1468&q=80");
  background-size: cover;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: #fff;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  background-color: teal;
  color: #fff;
  cursor: pointer;
  padding: 15px 20px;
  margin-bottom: 10px;
  &:disabled {
    cursor: not-allowed;
  }
`;

const Link = styled.a`
  margin: 5px 0;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, error } = useSelector((state) => state.user);

  const userInputHandler = (evt) => {
    const { name, value } = evt.target;

    if (name === "username") setUsername(value);
    else setPassword(value);
  };

  const loginHandler = (evt) => {
    evt.preventDefault();

    if (username.trim().length === 0 || password.trim().length < 6) return;

    login(dispatch, { username, password });
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            name="username"
            type="text"
            placeholder="username"
            onChange={userInputHandler}
          />
          <Input
            name="password"
            type="password"
            placeholder="password"
            onChange={userInputHandler}
          />
          <Button onClick={loginHandler} disabled={isFetching}>
            LOGIN
          </Button>
          {error && <Error>Something went wrong!</Error>}
          <Link>DO NOT REMEMBER THE PASSWORD?</Link>
          <Link>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
