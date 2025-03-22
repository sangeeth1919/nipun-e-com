import { notification } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { removeAlertService } from "../../../utils/utils";

function AlertContainer() {
    const { alerts } = useSelector((state) => state.system);  // Access alerts from the Redux store

    // To ensure notifications show in the correct position and duration
    useEffect(() => {
        notification.config({
            placement: 'topRight',  // Position of notification
            bottom: 50,             // Distance from the bottom
            duration: 3,            // Duration of the notification
        });
    }, []);
  
    // Function to trigger a notification
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        if (alerts.length > 0) {
            // Loop over all alerts and trigger the notification for each
            alerts.forEach(alert => {
                api.open({
                    message: alert.title, // Use alert title or default title
                    description: alert.message || 'Default description', // Use alert message or default description
                    duration: alert.duration || 3, // Use alert duration or default duration
                    onClose: () => removeAlertService(alert.messageId),
                    type: alert.type
                });
            });
        }
    }, [alerts, api]); // Re-run the effect when alerts change

    return <>{contextHolder}</>;
}

export default AlertContainer;
