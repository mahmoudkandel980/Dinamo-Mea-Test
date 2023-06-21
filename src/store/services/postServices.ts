import axios from "axios";
import {
    CreatePostFormData,
    EditPostFormData,
    NotificationInterface,
    Post,
    PostsDataType,
} from "../../interfaces/public";

const API_URL = "https://jsonplaceholder.typicode.com";

// Get posts
const getPosts = async () => {
    const { data } = await axios.get(`${API_URL}/posts`);

    // insert key property for single post wanted in antd
    const modifiedPosts: PostsDataType[] = data.map((post: Post) => {
        return { ...post, key: post.id };
    });

    return modifiedPosts;
};

// Create post
const createPost = async (formData: CreatePostFormData) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const { data } = await axios.post(`${API_URL}/posts`, formData, config);

    // insert key property for a post
    data.key = data.id;

    const post: PostsDataType = data;
    const success: NotificationInterface = {
        type: "success",
        message: "Post is Created",
        description: `Post with title ${data.title} is created`,
    };

    return { post, success };
};

// Edit post
const editPost = async (formData: EditPostFormData) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const { data } = await axios.put(
        `${API_URL}/posts/${formData.id}`,
        { title: formData.title, body: formData.body },
        config
    );

    const success: NotificationInterface = {
        type: "success",
        message: "Post is Edited",
        description: `Post with title ${data.title} is Edited`,
    };

    return { post: data, success };
};

// Delete post
const deletePost = async (id: number) => {
    await axios.delete(`${API_URL}/posts/${id}`);

    const success: NotificationInterface = {
        type: "success",
        message: "Post is Deleted",
        description: `Post with id ${id} is Deleted`,
    };
    return { id, success };
};

const postService = {
    getPosts,
    createPost,
    editPost,
    deletePost,
};

export default postService;
