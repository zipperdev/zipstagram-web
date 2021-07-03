import React from "react";
import { Link } from "react-router-dom";
import { useReactiveVar } from "@apollo/client";
import styled from "styled-components";
import { AiOutlineInstagram, FiHome, FiCompass } from "react-icons/all";
import useUser from "../hooks/useUser";
import { isLoggedInVar } from "../apollo";
import routes from "../routes";
import Avatar from "./Avatar";

const StyledHeader = styled.header`
    width: 100%;
    height: 60px;
    border-bottom: 1px solid ${props => props.theme.borderColor};
    background-color: ${props => props.theme.bgColor};
    padding: 18px 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    max-width: 930px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media screen and (max-width: 1000px) {
        max-width: 450px;
    };
`;

const Icon = styled.span`
    margin-left: 18px;
`;

const IconsContiner = styled.div`
    display: flex;
    align-items: center;
`;

const Button = styled.span`
    background-color: ${props => props.theme.accent};
    border-radius: 4px;
    padding: 4px 15px;
    padding-bottom: 5px;
    color: ${props => props.theme.mudColor};
    font-weight: 600;
    text-decoration: none;
`;

function Header() {
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const { data } = useUser();
    return (
        <StyledHeader>
            <Wrapper>
                <div>
                    <AiOutlineInstagram size={34} />
                </div>
                <div>
                    {isLoggedIn ? (
                        <IconsContiner>
                            <Icon>
                                <FiHome size={18} />
                            </Icon>
                            <Icon>
                                <FiCompass size={18} />
                            </Icon>
                            <Icon>
                                <Avatar size="20px" url={data?.me?.avatar} />
                            </Icon>
                        </IconsContiner>
                    ) : <Link to={routes.home}><Button>Login</Button></Link>}
                </div>
            </Wrapper>
        </StyledHeader>
    );
}
export default Header;