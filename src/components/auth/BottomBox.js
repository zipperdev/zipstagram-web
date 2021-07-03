import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BaseBox } from "../shared";

const Container = styled(BaseBox)`
    padding: 20px 0px;
    text-align: center;
    box-sizing: border-box;
    font-size: 16px;
    a {
        margin-left: 6px;
        font-weight: 600;
        color: ${props => props.theme.accent};
        text-decoration: underline;
    }
`;

function BottomBox({ actionText, link, linkText }) {
    return <Container>
        <span>{actionText}</span>
        <Link to={link}>{linkText}</Link>
    </Container>;
};

export default BottomBox;