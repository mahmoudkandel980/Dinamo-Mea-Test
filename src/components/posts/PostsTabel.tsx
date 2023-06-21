import React from "react";
import { useNavigate } from "react-router-dom";

import { Space, Table, Typography, Button, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EditFilled, DeleteFilled } from "@ant-design/icons";

import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store/store";
import { deletePost as deletePostFun } from "../../store/slices/postsSlices";

import { PostsDataType, PostsInterface } from "../../interfaces/public";

const PostsTabel = (props: PostsInterface) => {
    const { posts } = props;
    const columns: ColumnsType<PostsDataType | {}> = [
        {
            title: "id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "UserId",
            dataIndex: "userId",
            key: "userId",
            responsive: ["sm"],
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
        },
        {
            title: "Body",
            key: "body",
            dataIndex: "body",
            responsive: ["sm"],
        },
        {
            title: "Edit",
            key: "edit",

            render: (record) => {
                return (
                    <EditFilled
                        style={{ color: "orange" }}
                        onClick={() => {
                            editPostHandler(record);
                        }}
                    />
                );
            },
        },
        {
            title: "Delete",
            key: "delete",
            render: (record) => {
                return (
                    <DeleteFilled
                        style={{ color: "red" }}
                        onClick={() => {
                            deletePostHandler(record);
                        }}
                    />
                );
            },
        },
    ];

    const { Title } = Typography;
    const dipatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    // Delete post
    const deletePostHandler = (record: PostsDataType) => {
        Modal.confirm({
            title: `Are you sure you want delete the post with id ${record.id}`,
            onOk: () => {
                dipatch(deletePostFun(record.id));
            },
        });
    };

    // Edit post
    const editPostHandler = (record: PostsDataType) => {
        // Store post in localStorage to make sure when refresh screen or something happend. we will still have the post
        localStorage.setItem("editedPost", JSON.stringify(record));
        navigate(`/post/edit?id=${record.id}`);
    };
    return (
        <>
            <Space
                direction='vertical'
                style={{
                    marginLeft: "auto",
                    paddingTop: "20px",
                }}
            >
                <Space wrap>
                    <Button
                        type='primary'
                        size='large'
                        onClick={() => navigate("/post/create")}
                    >
                        Create Post
                    </Button>
                </Space>
            </Space>
            <Title level={4}>All Posts</Title>
            <Table columns={columns} dataSource={posts!} />
        </>
    );
};

export default PostsTabel;
