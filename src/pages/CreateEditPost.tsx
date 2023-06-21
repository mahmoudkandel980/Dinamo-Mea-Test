import React from "react";
import { useLocation } from "react-router-dom";

import { Typography } from "antd";

import CreateEditPostForm from "../components/posts/CreateEditPostForm";

const CreateEditPost = (): JSX.Element => {
    const { Title } = Typography;
    const { pathname } = useLocation();

    return (
        <>
            <Title level={4}>
                {pathname.includes("create") ? "Create" : "Edit"} Post
            </Title>
            <div
                style={{
                    width: "100vw",
                    display: "felx",
                    justifyItems: "center",
                }}
            >
                <CreateEditPostForm />
            </div>
        </>
    );
};

export default CreateEditPost;
