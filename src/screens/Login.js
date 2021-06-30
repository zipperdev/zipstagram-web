import React from "react";
import styled from "styled-components";
import { darkModeVar, isLoggedInVar } from "../apollo";

const Title = styled.h1`
    color: ${(props) => props.theme.fontColor};
`;

const Container = styled.div`
    background-color: ${(props) => props.theme.bgColor};
`;

const Button = styled.button`
    color: ${(props) => props.theme.fontColor};
`;

function Login() {
    return (
        <Container>
            <Title>Login</Title>
            <Button onClick={() => darkModeVar(true)}>To Dark Mode</Button>
            <Button onClick={() => darkModeVar(false)}>To Light Mode</Button>
            <Button onClick={() => isLoggedInVar(true)}>Log In</Button>
        </Container>
    );
};

export default Login;