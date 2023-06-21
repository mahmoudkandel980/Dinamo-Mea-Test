import React, { useEffect, useCallback } from "react";
import { notification } from "antd";

import { NotificationInterface } from "../../interfaces/public";
type NotificationType = "success" | "info" | "warning" | "error";

const Notification = (props: NotificationInterface): JSX.Element => {
    const { type, description, message } = props;
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = useCallback(
        (type: NotificationType) => {
            api[type]({
                message: message,
                description: description,
            });
        },
        [api, description, message]
    );

    useEffect(() => {
        openNotificationWithIcon(type as NotificationType);
    }, [openNotificationWithIcon, type]);

    return <>{contextHolder}</>;
};

export default Notification;
