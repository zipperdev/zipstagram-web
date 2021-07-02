import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
    bgColor: "#fafafa",
    fontColor: "#1c1c1c",
    mudColor: "#ffffff",
    weightColor: "#303030",
    accent: "#0095f6",
    focusBorderColor: "rgb(38, 38, 38)",
    borderColor: "rgb(219, 219, 219)"
};

export const darkTheme = {
    bgColor: "#2c2c2c",
    fontColor: "#fafafa",
    mudColor: "#000000",
    weightColor: "#e0e0e0",
    accent: "#0095f6",
    focusBorderColor: "rgb(80, 80, 80)",
    borderColor: "rgb(28, 28, 28)"
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    * {
        box-sizing: border-box;
    }
    body {
        background-color: ${props => props.theme.bgColor};
        font-size: 14px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
        color: ${props => props.theme.fontColor};
    }
    input {
        all: unset;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    }
`;