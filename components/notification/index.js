import ReactDOM from "react-dom";
import classes from "./Notification.module.scss";
import { useNotificationContext } from "../../context/notification_context";

function Notification({ title, message, status }) {
  const {
    activeNotification: { hide },
    hideNotification,
  } = useNotificationContext();

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
    hide === false ? classes.popup : classes.hide
  }`;

  return ReactDOM.createPortal(
    <div className={activeClasses} onClick={hideNotification}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>,
    document.getElementById("notification")
  );
}

export default Notification;
