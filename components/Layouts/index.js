import { memo } from "react";
import Navbar from "../Navbar";
import Notification from "../Notification";
import { useNotificationContext } from "../../context/notification_context";

function Layout({ children }) {
  const {
    activeNotification: { status, title, message },
  } = useNotificationContext();
  return (
    <>
      <Navbar />
      <main>{children}</main>
      {status && (
        <Notification title={title} message={message} status={status} />
      )}
    </>
  );
}
export default memo(Layout);
