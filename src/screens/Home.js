import React from "react";
import { gql, useQuery } from "@apollo/client";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";

export const FEED_QUERY = gql`
    query seeFeed {
        seeFeed {
            id
            user {
                username
                avatar
            }
            file
            caption
            likes
            isMine
            isLiked
            comments {
                id
                user {
                    username
                    avatar
                }
                payload
                isMine
                createdAt
            }
            commentCount
            createdAt
        }
    }
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