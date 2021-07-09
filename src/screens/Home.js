import React from "react";
import { gql, useQuery } from "@apollo/client";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";
import { COMMENT_FRAGMENT, PHOTO_FRAGMENT } from "../fragments";

export const FEED_QUERY = gql`
    query seeFeed {
        seeFeed {
            ...PhotoFragment
            user {
                username
                avatar
            }
            caption
            isMine
            comments {
                ...CommentFragment
            }
            createdAt
        }
    }
    ${PHOTO_FRAGMENT}
    ${COMMENT_FRAGMENT}
`;

function Home() {
    const { data } = useQuery(FEED_QUERY);
    return (
        <div>
            <PageTitle title="Home" />
            {data?.seeFeed?.map(photo => (
                <Photo key={photo.id} {...photo} />
            ))}
        </div>
    );
};

export default Home;