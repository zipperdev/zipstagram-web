import React from "react";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FiBookmark, FaRegHeart, FaHeart, FiMessageSquare, FiSend } from "react-icons/all";
import { WeightText } from "../../components/shared";
import Avatar from "../../components/Avatar";
import Comments from "./Comments";

const TOGGLE_LIKE_MUTATION = gql`
    mutation toggleLike($id: Int!) {
        toggleLike(id: $id) {
            success
            error
        }
    }
`;

const PhotoContainer = styled.div`
    background-color: ${props => props.theme.mudColor};
    border: 1px solid ${props => props.theme.borderColor};
    border-radius: 3px;
    margin-bottom: 20px;
    max-width: 615px;
`;

const PhotoHeader = styled.div`
    padding: 15px;
    display: flex;
    align-items: center;
`;

const Username = styled(WeightText)`
    margin-left: 15px;
`;

const PhotoFile = styled.img`
    width: 100%;
`;

const PhotoData = styled.div`
    padding: 15px;
`;

const PhotoActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
        display: flex;
        align-items: center;
    }
`;

const BookmarkAction = styled.div`
    cursor: pointer;
`;

const PhotoAction = styled.div`
    margin-right: 10px;
    cursor: pointer;
`;

const Likes = styled(WeightText)`
    margin-top: 12px;
    display: block;
`;

function Photo({ id, user, file, isLiked, likes, caption, commentCount, comments }) {
    const updateToggleLike = (cache, result) => {
        const { data: { toggleLike: { success } } } = result;
        if (success) {
            const fragmentId = `Photo:${id}`;
            cache.modify({
                id: fragmentId,
                fields: {
                    isLiked(prev) {
                        return !prev;
                    },
                    likes(prev) {
                        if (isLiked) {
                            return prev - 1;
                        } else {
                            return prev + 1;
                        };
                    }
                }
            });
        };
    };
    const [toggleLikeMutation] = useMutation(TOGGLE_LIKE_MUTATION, {
        variables: {
            id
        },
        update: updateToggleLike
    });
    return (
        <PhotoContainer key={id}>
            <PhotoHeader>
                <Link to={`/users/${user.username}`}>
                    <Avatar size="30px" url={user.avatar} />
                </Link>
                <Link to={`/users/${user.username}`}>
                    <Username>{user.username}</Username>
                </Link>
            </PhotoHeader>
            <PhotoFile src={file} alt="Photo" />
            <PhotoData>
                <PhotoActions>
                    <div>
                        <PhotoAction onClick={toggleLikeMutation}>
                            {isLiked ? (
                                <FaHeart color="#ff5050" size={22} />
                            ) : (
                                <FaRegHeart size={22} />
                            )}
                        </PhotoAction>
                        <PhotoAction>
                            <FiMessageSquare size={22} />
                        </PhotoAction>
                        <PhotoAction>
                            <FiSend size={22} />
                        </PhotoAction>
                    </div>
                    <div>
                        <BookmarkAction>
                            <FiBookmark size={22} />
                        </BookmarkAction>
                    </div>
                </PhotoActions>
                <Likes>{likes} {likes <= 1 ? "like" : "likes"}</Likes>
                <Comments
                    photoId={id}
                    author={user.username}
                    caption={caption}
                    comments={comments}
                    commentCount={commentCount}
                />
            </PhotoData>
        </PhotoContainer>
    );
};

Photo.propTypes = {
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired
    }),
    file: PropTypes.string.isRequired,
    caption: PropTypes.string,
    isLiked: PropTypes.bool.isRequired,
    likes: PropTypes.number.isRequired,
    comments: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        user: PropTypes.shape({
            avatar: PropTypes.string,
            username: PropTypes.string.isRequired
        }),
        payload: PropTypes.string.isRequired,
        isMine: PropTypes.bool.isRequired,
        createdAt: PropTypes.string.isRequired
    })),
    commentCount: PropTypes.number.isRequired
};

export default Photo;