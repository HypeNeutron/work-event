import { createContext, useContext, useState } from "react";

const notificationContext = createContext();

function NotificationContextProvider({ children }) {
  const idle = { hide: true };

  const [activeNotification, setActiveNotification] = useState(idle);

  const hide = () => {
    setActiveNotification((prev) => ({ ...prev, hide: true }));
  };

  const show = (noticeData) => {
    setActiveNotification(noticeData);
    const time = setTimeout(() => hide(), 5000);
    return () => {
      clearTimeout(time);
    };
  };

  const context = {
    activeNotification,
    show,
    hide,
  };

  return (
    <notificationContext.Provider value={context}>
      {children}
    </notificationContext.Provider>
  );
}

const useNotificationContext = () => {
  return useContext(notificationContext);
};

export { NotificationContextProvider, useNotificationContext };
