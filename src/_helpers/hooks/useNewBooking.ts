import { useContext } from 'react';
import { NewBooking } from '../models/new-booking.model';
import { useInput } from './useInput';
import NotificationContext from '@/context/notification/notification';
import { StringUtils } from '../utils/string.utils';

const initialNewBooking: NewBooking = {
  type: undefined,
  date: '',
  fromDate: '',
  toDate: '',
  fromTime: '',
  toTime: '',
  totalTime: '',
  totalHrs: '',
  breakTime: '',
};

export const useNewBooking = () => {
  const {
    inputs,
    setInputs,
    errors,
    setErrors,
    handleInputChange,
    handleResetInput,
  } = useInput(initialNewBooking);
  const notificationCtx = useContext(NotificationContext);

  return {
    inputs,
    setInputs,
    errors,
    setErrors,
    handleInputChange,
    handleResetInput,
    notificationCtx,
  };
};
