import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { getPosts as getPostsFun } from "../store/slices/postsSlices";

import Notification from "../components/util/Notification";
import Spinner from "../components/util/Spinner";
import PostsTabel from "../components/posts/PostsTabel";

const Posts: React.FC = () => {
    const dipatch = useDispatch<AppDispatch>();

    // Get Posts
    const { posts, error, loading } = useSelector(
        (state: RootState) => state.post
    );

    // Fetch Posts When we posts length less than 10 posts to allow users edit and delete posts
    useEffect(() => {
        if (posts.length < 10) {
            dipatch(getPostsFun());
        }
    }, [dipatch, posts]);

    return loading ? (
        <Spinner />
    ) : error ? (
        <Notification
            description={error.description}
            message={error.message}
            type={error.type}
        />
    ) : (
        <PostsTabel posts={posts} />
    );
};

export default Posts;
