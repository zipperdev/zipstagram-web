import React from "react";
import { useParams } from "react-router-dom";
import { FaHeart, FaRegHeart, FiMessageSquare } from "react-icons/all";
import { gql, useMutation, useQuery } from "@apollo/client";
import styled from "styled-components";
import Button from "../components/Button";
import { PHOTO_FRAGMENT } from "../fragments";
import PageTitle from "../components/PageTitle";
import useUser from "../hooks/useUser";

const FOLLOW_USER_MUTATION = gql`
    mutation followUser($username: String!) {
        followUser(username: $username) {
            success
        }
    }
`;

const UNFOLLOW_USER_MUTATION = gql`
    mutation unfollowUser($username: String!) {
        unfollowUser(username: $username) {
            success
        }
    }
`;

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
    position: relative;
    display: flex;
    align-items: center;
`;

const ProfileButton = styled(Button)`
    width: 100px;
    position: absolute;
    margin-top: -2px;
    margin-left: 10px;
`;

const Avatar = styled.div`
    margin-right: 60px;
    width: 160px;
    height: 160px;
    border-radius: 50%;
    background-color: ${props => props.theme.swapColor};
    overflow: hidden;
`;

const Image = styled.img`
    max-width: 100%;
    max-height: 100%;
`;

const ProfileDescContainer = styled.div`
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const TopBox = styled.div`
    display: flex;
`;

const BottomBox = styled.div`
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const Username = styled.h1`
    font-size: 30px;
`;

const FollowContainer = styled.div`
    display: flex;
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
    const { data: userData } = useUser();
    const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
        variables: {
            username
        }
    });
    const [followUser] = useMutation(FOLLOW_USER_MUTATION, {
        variables: {
            username
        },
        update: (cache, result) => {
            const { data: { followUser: { success } } } = result;
            if (!success) {
                return;
            } else {
                cache.modify({
                    id: `User:${username}`,
                    fields: {
                        isFollowing() {
                            return true;
                        },
                        totalFollowers(prev) {
                            return prev + 1;
                        }
                    }
                });
                const { me } = userData;
                cache.modify({
                    id: `User:${me.username}`,
                    fields: {
                        totalFollowing(prev) {
                            return prev + 1;
                        }
                    }
                });
            };
        }
    });
    const [unfollowUser] = useMutation(UNFOLLOW_USER_MUTATION, {
        variables: {
            username
        },
        update: (cache, result) => {
            const { data: { unfollowUser: { success } } } = result;
            if (!success) {
                return;
            } else {
                cache.modify({
                    id: `User:${username}`,
                    fields: {
                        isFollowing() {
                            return false;
                        },
                        totalFollowers(prev) {
                            return prev - 1;
                        }
                    }
                });
                const { me } = userData;
                cache.modify({
                    id: `User:${me.username}`,
                    fields: {
                        totalFollowing(prev) {
                            return prev - 1;
                        }
                    }
                });
            };
        }
    });
    const getButton = (seeProfile) => {
        const { isMe, isFollowing } = seeProfile;
        if (isMe) {
            return <ProfileButton>Edit Profile</ProfileButton>
        } else if (isFollowing) {
            return <ProfileButton onClick={unfollowUser}>Unfollow</ProfileButton>
        } else {
            return <ProfileButton onClick={followUser}>Follow</ProfileButton>
        };
    };
    return (
        <Container>
            <PageTitle title={loading ? "Loading..." : `${data?.seeProfile?.username}'s Profile`} />
            <ProfileContainer>
                <Avatar>
                    {data?.seeProfile?.avatar ? <Image src={data?.seeProfile?.avatar} alt="Avatar" /> : null}
                </Avatar>
                <ProfileDescContainer>
                    <TopBox>
                        <Username>{data?.seeProfile?.username}</Username>
                        {data?.seeProfile ? getButton(data.seeProfile) : null}
                    </TopBox>
                    <BottomBox>
                        <FollowContainer>
                            <Followers><Strong>{data?.seeProfile?.totalFollowers}</Strong> followers</Followers>
                            <Following><Strong>{data?.seeProfile?.totalFollowing}</Strong> following</Following>
                        </FollowContainer>
                        <RealName>{data?.seeProfile?.firstName} {data?.seeProfile?.lastName}</RealName>
                        {data?.seeProfile?.bio ? (
                            <BioText>{data?.seeProfile?.bio}</BioText>
                        ) : null}
                    </BottomBox>
                </ProfileDescContainer>
            </ProfileContainer>
            <PhotosContainer>
                {data?.seeProfile?.photos?.map((photo, index) => (
                    <PhotoContainer key={index} bgImage={photo.file}>
                        <Icons>
                            <Icon>
                                {photo.isLiked ? (
                                    <FaHeart size={22} />
                                ) : (
                                    <FaRegHeart size={22} />
                                )}
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