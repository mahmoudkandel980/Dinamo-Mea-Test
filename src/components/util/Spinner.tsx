import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Space } from "antd";

const Spinner: React.FC = () => (
    <Space
        style={{
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "300px",
        }}
    >
        <LoadingOutlined style={{ fontSize: "30px" }} />
    </Space>
);

export default Spinner;
