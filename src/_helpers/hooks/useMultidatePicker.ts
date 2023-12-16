import { useRef, useState } from 'react';

export function useMultidatePicker(initials: any) {
  const [selectedDates, setSelectedDates] = useState(initials);
  const ref = useRef(null);
  function handleDateChange(name: string, d: Date) {
    setSelectedDates((currentDates: any) => {
      return {
        ...currentDates,
        [name]: d,
      };
    });
  }
  return { selectedDates, handleDateChange, ref };
}
