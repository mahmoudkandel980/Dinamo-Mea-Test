import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { AppDispatch, RootState } from "../../store/store";

import Notification from "../util/Notification";

import { resetSuccessAndError } from "../../store/slices/postsSlices";

const SuccessNotifications = () => {
    const dispatch = useDispatch<AppDispatch>();

    // Create, Edit and Delete Post
    const { success } = useSelector((state: RootState) => state.post);

    // Reset Create, Edit, Delete post data to remove success notifications
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                dispatch(resetSuccessAndError());
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [success, dispatch]);

    return (
        <div>
            {success && (
                <Notification
                    description={success.description}
                    message={success.message}
                    type={success.type}
                />
            )}
        </div>
    );
};

export default SuccessNotifications;
