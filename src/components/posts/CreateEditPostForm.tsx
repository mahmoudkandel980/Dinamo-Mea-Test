import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Form, Input } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
    createPost as createPostFun,
    editPost as editPostFun,
} from "../../store/slices/postsSlices";

import { CreatePostFormData, PostsDataType } from "../../interfaces/public";
import TextArea from "antd/es/input/TextArea";

const CreateEditPostForm = (): JSX.Element => {
    const navigate = useNavigate();
    const { pathname, search } = useLocation();
    const dispatch = useDispatch<AppDispatch>();
    const [initailFormData] = useState<PostsDataType | null>(
        pathname.includes("/post/edit") && localStorage.getItem("editedPost")
            ? JSON.parse(localStorage.getItem("editedPost") as string)
            : null
    );

    // Create Edit Post
    const onFinish = (data: CreatePostFormData) => {
        if (pathname === "/post/create") {
            // Create Post
            dispatch(createPostFun(data));
        } else {
            const query = new URLSearchParams(search);
            const id = query.get("id");
            if (id) {
                const editedData = { ...data, id: +id! };
                // Edit Post
                dispatch(editPostFun(editedData));
            }
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    // Create and Edit Post
    const { success } = useSelector((state: RootState) => state.post);

    // When post is Created or Edited make sure navigation to posts page
    useEffect(() => {
        if (success) navigate("/");
    }, [success, navigate]);

    return (
        <Form
            name='basic'
            style={{ maxWidth: 600 }}
            layout='vertical'
            initialValues={
                pathname.includes("/post/edit") && initailFormData
                    ? {
                          title: initailFormData?.title,
                          body: initailFormData?.body,
                      }
                    : { remember: true }
            }
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete='off'
        >
            <Form.Item
                label='Title'
                name='title'
                rules={[
                    { required: true, message: "Please input your title!" },
                ]}
            >
                <Input placeholder="Enter Post's Title" />
            </Form.Item>

            <Form.Item
                label='Body'
                name='body'
                rules={[{ required: true, message: "Please input your body!" }]}
            >
                <TextArea rows={4} placeholder="Enter Post's Body" />
            </Form.Item>

            <Form.Item>
                <Button type='primary' htmlType='submit' block>
                    {pathname === "/post/create" ? "Create Post" : "Edit Post"}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CreateEditPostForm;
