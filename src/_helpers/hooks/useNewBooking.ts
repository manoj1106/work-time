import { useContext } from 'react';
import { NewBooking } from '../models/new-booking.model';
import { useInput } from './useInput';
import NotificationContext from '@/context/notification/notification';
import { TimesheetType } from '../enums/timesheet.type';

export const initialNewBooking: NewBooking = {
  type: TimesheetType.PLEASE_SELECT,
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
