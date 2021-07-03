import React from "react";
import styled from "styled-components";

const StyledAvatar = styled.div`
    width: ${props => props.size};
    height: ${props => props.size};
    border-radius: 50%;
    background-color: ${props => props.theme.swapColor};
    overflow: hidden;
`;

const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
`;

function Avatar({ size, url }) {
    return <StyledAvatar size={size}>
        {url ? <Image src={url} alt="Avatar" /> : null}
    </StyledAvatar>;
};

export default Avatar;