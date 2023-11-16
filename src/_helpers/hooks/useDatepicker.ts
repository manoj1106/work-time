import { useState } from 'react';
import { DateUtils } from '../utils/date-utils';

export const useDatepicker = (initial = new Date()) => {
  const [selectedDate, setSelectedDate] = useState(initial);
  const [formattedDate, setFormattedDate] = useState('');

  const handleDateChangeWith = (format: string, date: Date) => {
    setSelectedDate(date);
    const formattedDate = DateUtils.getFormattedDateWith(format, date);
    setFormattedDate(formattedDate);
  };

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    const formattedDate = DateUtils.getFormattedDate(date);
    setFormattedDate(formattedDate);
  };

  return {
    selectedDate,
    formattedDate,
    handleDateChangeWith,
    handleDateChange,
  };
};
