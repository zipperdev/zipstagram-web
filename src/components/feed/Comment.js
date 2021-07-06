import React from "react";
import { Link } from "react-router-dom";
import { FiDelete } from "react-icons/fi";
import PropTypes from "prop-types";
import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";
import { WeightText } from "../../components/shared";

const DELETE_COMMENT_MUTATION = gql`
    mutation edeleteComment($id: Int!) {
        deleteComment(id: $id) {
            success
            error
        }
    }
`;

const CommentContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    margin-top: 8px;
`;

const CommentCaption = styled.span`
    margin-left: 10px;
    a {
        background-color: inherit;
        color: ${props => props.theme.accent};
        cursor: pointer;
        &:hover {
            text-decoration: underline;
        }
    }
`;

const CommentDeleteButton = styled.button`
    cursor: pointer;
    position: absolute;
    right: 0;
    border: none;
    color: ${props => props.theme.fontColor};
    background-color: transparent;
`;

function Comment({ id, photoId, isMine, author, payload }) {
    const updateDeleteComment = (cache, result) => {
        const { data: { deleteComment: { success } } } = result;
        if (success) {
            cache.evict({ id: `Comment:${id}` });
            cache.modify({
                id: `Photo:${photoId}`,
                fields: {
                    commentCount(prev) {
                        return prev - 1;
                    }
                }
            });
        };
    };
    const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
        variables: {
            id
        },
        update: updateDeleteComment
    });
    const deleteComment = () => {
        deleteCommentMutation()
    };
    return (
        <CommentContainer>
            <WeightText>{author}</WeightText>
            <CommentCaption>{
                payload.split(" ").map((word, index) =>
                    /#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g.test(word) ? (
                        <React.Fragment key={index}>
                            <Link to={`/hashtags/${word}`}>{word}</Link>
                            {" "}
                        </React.Fragment>
                    ) : (
                        <React.Fragment key={index}>{word} </React.Fragment>
                    ))
            }</CommentCaption>
            {isMine ? <CommentDeleteButton onClick={deleteComment}>
                <FiDelete size={14} />
            </CommentDeleteButton> : null}
        </CommentContainer>
    );
};

Comment.propTypes = {
    id: PropTypes.number,
    photoId: PropTypes.number,
    isMine: PropTypes.bool,
    author: PropTypes.string.isRequired,
    payload: PropTypes.string.isRequired
};

export default Comment;