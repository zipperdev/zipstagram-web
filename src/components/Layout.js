import React from "react";
import styled from "styled-components";
import Header from "./Header";

const Content = styled.main`
    max-width: 930px;
    width: 100%;
    margin: 40px auto 0;
    @media screen and (max-width: 1000px) {
        max-width: 450px;
    };
`;

function Layout({ children }) {
    return <>
        <Header />
        <Content>
            {children}
        </Content>
    </>;
};

export default Layout;