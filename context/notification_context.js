import { createContext, useContext, useState } from "react";

const notificationContext = createContext();

function NotificationContextProvider({ children }) {
  const [activeNotification, setActiveNotification] = useState({ hide: true });

  const hideNotification = () => {
    setActiveNotification((prev) => ({ ...prev, hide: true }));
  };

  const showNotification = (noticeData) => {
    setActiveNotification(noticeData);
    const time = setTimeout(() => hideNotification(), 5000);
    return () => {
      clearTimeout(time);
    };
  };

  const context = {
    activeNotification,
    showNotification,
    hideNotification,
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
