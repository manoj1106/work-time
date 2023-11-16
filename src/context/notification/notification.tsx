import { createContext, useCallback } from 'react';
import Notification from '@/components/widgets/notification/notification';
import { ResponseType } from '@/_helpers/enums/response.type';

interface NotificaionProps {
  notify: boolean;
  type: ResponseType;
  msg: string;
}

const NotificationContext = createContext({
  notify: function (notify: boolean, type: ResponseType, msg: string) {},
  dismiss: function () {},
});

interface NotificationContextProps {
  children: React.ReactNode;
}

export function NotificationContextProvider(props: NotificationContextProps) {
  const notify = useCallback(
    (notify: boolean, type: ResponseType, msg: string) => {
      Notification({ notify, type, msg });
    },
    []
  );

  const dismiss = useCallback(() => {
    Notification.dismiss();
  }, []);

  const context = {
    notify: notify,
    dismiss: dismiss,
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
