import React from "react";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import styled from "styled-components";
import useUser from "../../hooks/useUser";
import Comment from "./Comment";

const CREATE_COMMENT_MUTATION = gql`
    mutation createComment($photoId: Int!, $payload: String!) {
        createComment(photoId: $photoId, payload: $payload) {
            success
            id
            error
        }
    }
`;

const CommentsContainer = styled.div`
    margin-top: 20px;
`;

const CommentCount = styled.span`
    opacity: 0.7;
    margin: 20px 0 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid ${props => props.theme.weightColor};
    display: block;
    font-weight: 600;
    font-size: 12px;
`;

const Form = styled.form`
    margin-top: 12px;
    width: 100%;
    height: 20px;
`;

const Input = styled.input`
    width: 100%;
    height: 100%;
    font-size: 14px;
`;

function Comments({ photoId, author, caption, commentCount, comments }) {
    const { data: userData } = useUser();
    const { register, handleSubmit, setValue, getValues } = useForm();
    const [createCommentMutation, { loading }] = useMutation(
        CREATE_COMMENT_MUTATION,
        {
            update: (cache, result) => {
                const { data: { createComment: { success, id } } } = result;
                if (success && userData.me) {
                    const { payload } = getValues();
                    setValue("payload", "");
                    const newComment = {
                        __typename: "Comment",
                        createdAt: String(Date.now()),
                        id,
                        isMine: true,
                        payload,
                        user: {
                            ...userData.me
                        }
                    };
                    const newCacheComment = cache.writeFragment({
                        data: newComment,
                        fragment: gql`
                            fragment NewComment on Comment {
                                id
                                createdAt
                                isMing
                                payload
                                user {
                                    username
                                    avatar
                                }
                            }
                        `
                    });
                    return cache.modify({
                        id: `Photo:${photoId}`,
                        fields: {
                            comments(prev) {
                                return [...prev, newCacheComment];
                            },
                            commentCount(prev) {
                                return prev + 1;
                            }
                        }
                    });
                };
            }
        }
    );
    const onValid = data => {
        const { payload } = data;
        if (loading) {
            return;
        } else {
            return createCommentMutation({
                variables: {
                    photoId,
                    payload
                }
            });
        };
    };
    return (
        <CommentsContainer>
            <Comment author={author} payload={caption} />
            <CommentCount>{commentCount} {commentCount <= 1 ? "comment" : "comments"}</CommentCount>
            {comments?.map(comment => (
                <Comment key={comment.id} id={comment.id} photoId={photoId} isMine={comment.isMine} author={comment.user.username} payload={comment.payload} />
            ))}
            <div>
                <Form onSubmit={handleSubmit(onValid)}>
                    <Input ref={register({
                        required: true
                    })} name="payload" type="text" placeholder="Write a comment..." />
                </Form>
            </div>
        </CommentsContainer>
    );
};

Comments.propTypes = {
    photoId: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired,
    caption: PropTypes.string,
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

export default Comments;