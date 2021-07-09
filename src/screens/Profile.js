import React from "react";
import { useParams } from "react-router-dom";
import { FaRegHeart, FiMessageSquare } from "react-icons/all";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { PHOTO_FRAGMENT } from "../fragments";
import Avatar from '../components/Avatar';

const SEE_PROFILE_QUERY = gql`
    query seeProfile($username: String!) {
        seeProfile(username: $username) {
            firstName
            lastName
            username
            bio
            avatar
            photos {
                ...PhotoFragment
            }
            totalFollowing
            totalFollowers
            isMe
            isFollowing
        }
    }
    ${PHOTO_FRAGMENT}
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    `;

const ProfileContainer = styled.div`
    display: flex;
    align-items: center;
    `;

const ProfileDescContainer = styled.div`
    position: relative;
    height: 150px;
    margin-left: 140px;
    display: flex;
    flex-direction: column;
`;

const Username = styled.h1`
    font-size: 30px;
    margin-bottom: 20px;
`;

const FollowContainer = styled.div`
    display: flex;
    margin-bottom: 20px;
`;

const Followers = styled.h3`
    font-weight: 400;
`;

const Following = styled.h3`
    font-weight: 400;
    margin-left: 10px;
`;

const Strong = styled.b`
    font-weight: 600;
`;

const RealName = styled.h2`
    font-size: 20px;
    font-weight: 500;
`;

const BioText = styled.p`
    font-size: 14px;
    position: absolute;
    bottom: 10px;
`;

const PhotosContainer = styled.div`
    display: grid;
    grid-auto-rows: 290px;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    margin-top: 50px;
`;

const PhotoContainer = styled.div`
    background-image: url(${(props) => props.bgImage});
    background-size: cover;
    position: relative;
`;

const Icons = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    opacity: 0;
    transition: 0.1s opacity;
    &:hover {
        opacity: 1;
    }
`;

const Icon = styled.span`
    font-size: 18px;
    display: flex;
    align-items: center;
    margin: 0px 5px;
    svg {
        font-size: 14px;
        margin-right: 5px;
    }
`;

const IconText = styled.h6`
    font-size: 16px;
    text-align: center;
`;

function Profile() {
    const { username } = useParams();
    const { data } = useQuery(SEE_PROFILE_QUERY, {
        variables: {
            username
        }
    });
    return (
        <Container>
            <ProfileContainer>
                <Avatar size="150px" url={data?.seeProfile?.avatar} />
                <ProfileDescContainer>
                    <Username>{data?.seeProfile?.username}</Username>
                    <FollowContainer>
                        <Followers><Strong>{data?.seeProfile?.totalFollowers}</Strong> followers</Followers>
                        <Following><Strong>{data?.seeProfile?.totalFollowing}</Strong> following</Following>
                    </FollowContainer>
                    <RealName>{data?.seeProfile?.firstName} {data?.seeProfile?.lastName}</RealName>
                    <BioText>{data?.seeProfile?.bio}</BioText>
                </ProfileDescContainer>
            </ProfileContainer>
            <PhotosContainer>
                {data?.seeProfile?.photos?.map((photo, index) => (
                    <PhotoContainer key={index} bgImage={photo.file}>
                        <Icons>
                            <Icon>
                                <FaRegHeart size={22} />
                                <IconText>{photo.likes}</IconText>
                            </Icon>
                            <Icon>
                                <FiMessageSquare size={22} />
                                <IconText>{photo.commentCount}</IconText>
                            </Icon>
                        </Icons>
                    </PhotoContainer>
                ))}
            </PhotosContainer>
        </Container>
    );
};

export default Profile;