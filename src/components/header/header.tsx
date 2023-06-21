import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import type { MenuProps } from "antd";
import { Menu } from "antd";

const Header: React.FC = () => {
    const [current, setCurrent] = useState("");
    const { pathname } = useLocation();

    const items: MenuProps["items"] = [
        {
            label: (
                <Link to='/' className='nav-text'>
                    posts
                </Link>
            ),
            key: "posts",
        },
        {
            label: (
                <Link to='/post/create' className='nav-text'>
                    Create Post
                </Link>
            ),
            key: "create",
        },
        {
            label: "Edit Post",
            key: "edit",
            disabled: pathname.includes("/post/edit") ? false : true,
        },
    ];

    // when refresh the page make sure to mark the correct menu item
    useEffect(() => {
        if (pathname === "/") {
            setCurrent("posts");
        } else if (pathname === "/post/create") {
            setCurrent("create");
        } else {
            setCurrent("edit");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    const onClick: MenuProps["onClick"] = (e) => {
        setCurrent(e.key);
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "end",
                paddingLeft: "10px",
                paddingRight: "10px",
            }}
        >
            <Link to='/'>
                <img
                    src='/DinamoMea.png'
                    style={{ borderRadius: "50%", width: "30px" }}
                    alt='header logo'
                />
            </Link>
            <Menu
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                onClick={onClick}
                selectedKeys={[current]}
                mode='horizontal'
                items={items}
            />
        </div>
    );
};

export default Header;
