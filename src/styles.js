import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
    fontColor: "#2c2c2c", 
    bgColor: "#e1e1e1"
};

export const darkTheme = {
    fontColor: "#ffffff", 
    bgColor: "#2c2c2c"
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    body {
        background-color: ${(props) => props.theme.bgColor};
    }
`;