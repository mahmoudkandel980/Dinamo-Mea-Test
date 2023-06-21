import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import postService from "../services/postServices";
import {
    NotificationInterface,
    CreatePostFormData,
    EditPostFormData,
    PostsDataType,
} from "../../interfaces/public";
import { initalStateRedux } from "../../interfaces/public";

const initialState: initalStateRedux = {
    posts: [],
    loading: false,
    error: null,
    success: null,
};

// Get Posts
export const getPosts = createAsyncThunk("posts/get", async (_, thunkAPI) => {
    try {
        return await postService.getPosts();
    } catch (err) {
        const error: NotificationInterface = {
            type: "error",
            message: "Failed to get all posts",
            description: "Something Went Wrong. Please try again later",
        };
        return thunkAPI.rejectWithValue(error);
    }
});

// Create Post
export const createPost = createAsyncThunk(
    "post/post",
    async (formData: CreatePostFormData, thunkAPI) => {
        try {
            return await postService.createPost(formData);
        } catch (err) {
            const error: NotificationInterface = {
                type: "error",
                message: "Failed Create a post",
                description: "Something Went Wrong. Please try again later",
            };
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// Edit Post
export const editPost = createAsyncThunk(
    "post/put",
    async (formData: EditPostFormData, thunkAPI) => {
        try {
            return await postService.editPost(formData);
        } catch (err) {
            const error: NotificationInterface = {
                type: "error",
                message: "Failed Edit a post",
                description: "Something Went Wrong. Please try again later",
            };
            return thunkAPI.rejectWithValue(error);
        }
    }
);

// Edit Post
export const deletePost = createAsyncThunk(
    "post/delete",
    async (id: number, thunkAPI) => {
        try {
            return await postService.deletePost(id);
        } catch (err) {
            const error: NotificationInterface = {
                type: "error",
                message: "Failed Edit a post",
                description: "Something Went Wrong. Please try again later",
            };
            return thunkAPI.rejectWithValue(error);
        }
    }
);

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        reset: (state) => initialState,
        resetSuccessAndError: (state) => {
            return { ...state, success: null, error: null };
        },
    },
    extraReducers: (builder) => {
        builder
            // Get Posts
            .addCase(getPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as NotificationInterface;
            })
            // Create Post
            .addCase(createPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.loading = false;
                const { post, success } = action.payload;
                state.success = success;
                // Add the created post to the posts
                const modifiedPosts = [...state.posts];
                modifiedPosts.push(post);
                state.posts = modifiedPosts;
            })
            .addCase(createPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as NotificationInterface;
            })
            // Edit Post
            .addCase(editPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(editPost.fulfilled, (state, action) => {
                state.loading = false;
                const { post, success } = action.payload;
                state.success = success;
                // Add edited post instead of the old one to the posts
                const modifiedPosts = [...state.posts];
                const editedPostIndex: number = modifiedPosts.findIndex(
                    (p: PostsDataType) => +p.id === +post.id
                );
                modifiedPosts.splice(editedPostIndex, 1, post);
                state.posts = modifiedPosts;
            })
            .addCase(editPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as NotificationInterface;
            })
            // Delete Post
            .addCase(deletePost.pending, (state) => {
                state.loading = true;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.loading = false;
                const { id, success } = action.payload;
                state.success = success;
                // Delete the post with the same id from posts
                const modifiedPosts = [...state.posts];
                const editedPostIndex: number = modifiedPosts.findIndex(
                    (p: PostsDataType) => +p.id === +id
                );
                modifiedPosts.splice(editedPostIndex, 1);
                state.posts = modifiedPosts;
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as NotificationInterface;
            });
    },
});

export const { reset, resetSuccessAndError } = postSlice.actions;
export default postSlice.reducer;
