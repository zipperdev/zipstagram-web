import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { useReactiveVar } from "@apollo/client";
import { darkModeVar, disableDarkMode, enableDarkMode } from "../apollo";
import logoLight from "../contents/logo_light.png";
import logoDark from "../contents/logo_dark.png";

export const BaseBox = styled.div`
    background-color: ${props => props.theme.bgColor};
    border: 1px solid ${props => props.theme.borderColor};
    width: 100%;
`;

export const WeightLink = styled.span`
    font-weight: 600;
    color: ${props => props.theme.weightColor};
`;

const StyledNotification = styled.div`
    display: flex;
    align-items: center;
    position: fixed;
    padding: 20px;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    font-weight: 600;
    background-color: #2ecc71;
    color: ${props => props.theme.mudColor};
`;
export const Notification = ({ children }) => <StyledNotification>{children}</StyledNotification>;

const StyledLogoImage = styled.div`
    width: 220px;
    height: 60px;
    background-size: 100%;
    background-repeat: no-repeat;
    background-image: url(${props => props.theme.mudColor === "#000000" ? logoLight : logoDark});
`;
export const LogoImage = (props) => <StyledLogoImage></StyledLogoImage>;


const StyledDarkModeBtn = styled.span`
    cursor: pointer;
`;
export function DarkModeBtn() {
    const darkMode = useReactiveVar(darkModeVar);
    return (
        <StyledDarkModeBtn onClick={darkMode ? disableDarkMode : enableDarkMode}>
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
        </StyledDarkModeBtn>
    );
};