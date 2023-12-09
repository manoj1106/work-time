import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import {
  FaInfo,
  FaCheck,
  FaExclamationTriangle,
  FaBug,
  FaExclamationCircle,
} from 'react-icons/fa';
import { ResponseType } from '@/_helpers/enums/response.type';

interface NotificationIconProps {
  type: ResponseType;
}

export function NotificationIcon(props: NotificationIconProps) {
  switch (props.type) {
    case ResponseType.SUCCESS:
      return <FaCheck />;
    case ResponseType.INFO:
      return <FaInfo />;
    case ResponseType.ERROR:
      return <FaExclamationCircle />;
    case ResponseType.WARNING:
      return <FaExclamationTriangle />;
    default:
      return <FaBug />;
  }
}

interface NotificationProps {
  notify: boolean | undefined;
  type: ResponseType;
  msg: string;
}

function Notification({ notify, type, msg }: NotificationProps) {
  return (
    <Fragment>
      {notify &&
        toast[type](
          <div style={{ display: 'flex' }}>
            <div style={{ flexGrow: 1, fontSize: 15, padding: '8px 12px' }}>
              {msg}
            </div>
          </div>
        )}
    </Fragment>
  );
}

Notification.propTypes = {
  msg: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

Notification.dismiss = toast.dismiss;

export default Notification;
