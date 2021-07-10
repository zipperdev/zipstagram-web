import styled, { css } from "styled-components";

const Container = styled.div`
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    align-items: left;
    width: 100%;
`;

const StyledButton = styled.button`
    width: 100%;
    border-radius: 4px;
    box-sizing: border-box;
    margin-top: 20px;
    background-color: ${props => props.theme.accent};
    color: ${props => props.theme.mudColor};
    text-align: center;
    padding: 8px 0px;
    font-weight: 600;
    transition: 0.1s ease-in opacity;
    ${props => props.disabled ? css`
        opacity: 0.6;
    ` : css`
        cursor: pointer;
    `}
`;

const ErrorText = styled.p`
    margin-top: 2px;
    font-size: 14px;
    font-weight: 600;
    color: #ff471a;
`;

function Button(props) {
    const buttonProps = { errorResult: null, ...props };
    return <Container>
        <StyledButton {...buttonProps}>{props.children}</StyledButton>
        {props.errorResult ? (
            <ErrorText>{props.errorResult}</ErrorText>
        ) : null}
    </Container>
};

export default Button;