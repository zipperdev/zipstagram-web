import styled, { css } from "styled-components";

const Container = styled.div`
    margin-top: 5px;
    display: flex;
    flex-direction: column;
    align-items: left;
    width: 100%;
`;

const StyledButton = styled.input`
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
    ${props => props.disabled ? null : css`
        cursor: pointer;
    `}
    opacity: ${props => props.disabled ? "0.4" : "1"}
`;

const ErrorText = styled.p`
    margin-top: 2px;
    font-size: 14px;
    font-weight: 600;
    color: #ff471a;
`;

function SubmitButton(props) {
    const buttonProps = { errorResult: null, ...props };
    return <Container>
        <StyledButton {...buttonProps} />
        {props.errorResult ? (
            <ErrorText>{props.errorResult}</ErrorText>
        ) : null}
    </Container>;
};

export default SubmitButton;