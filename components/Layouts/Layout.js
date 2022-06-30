import { memo } from "react";
import Navbar from "./Navbar";
import Notification from "../../components/notification/Notification";
import { useNotificationContext } from "../../context/notification_context";

function Layout({ children }) {
  const { activeNotification } = useNotificationContext();
  return (
    <>
      <Navbar />
      <main>{children}</main>
      {activeNotification.status && (
        <Notification
          title={activeNotification.title}
          message={activeNotification.message}
          status={activeNotification.status}
        />
      )}
    </>
  );
}
export default memo(Layout);
