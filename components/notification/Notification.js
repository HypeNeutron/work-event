import classes from "./Notification.module.scss";
import { useNotificationContext } from "../../context/notification_context";

function Notification({ title, message, status }) {
  const { activeNotification, hide } = useNotificationContext();

  let statusClasses = "";

  switch (status) {
    case "pending":
      statusClasses = classes.pending;
      break;
    case "success":
      statusClasses = classes.success;
      break;
    case "error":
      statusClasses = classes.error;
      break;
    case "warning":
      statusClasses = classes.warning;
      break;
    default:
      break;
  }

  const activeClasses = `${classes.notification} ${statusClasses} ${
    activeNotification.hide === false ? classes.popup : classes.hide
  }`;

  return (
    <div className={activeClasses} onClick={hide}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
