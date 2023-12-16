import { Fragment, useEffect } from 'react';
import { useDatepicker } from '@/_helpers/hooks/useDatepicker';
import { NewBooking } from '@/_helpers/models/new-booking.model';
import { DateUtils } from '@/_helpers/utils/date-utils';
import { CCol, CRow } from '@coreui/react';
import CustomDatePicker from '@/components/widgets/date-picker/date-picker';

interface PublicHolidayBookingProps {
  inputs: NewBooking;
  errors?: any;
  handleChange: (e: any) => void;
  setInputs: (inputs: any) => void;
}

const format = DateUtils.DDMMYYYY_HIPHAN;

const PublicHolidayBooking = (props: PublicHolidayBookingProps) => {
  const { selectedDate, handleDateChange } = useDatepicker();
  // setting the date on component load
  /*
  useEffect(() => {
    const formattedDate = DateUtils.getFormattedDateWith(format, selectedDate);
    props.setInputs((currentInputs: any) => {
      return {
        ...currentInputs,
        date: formattedDate,
      };
    });
  }, []);
  */

  // handling the public holiday date change
  const handlePublicHolidaySelect = (date: Date, e: any) => {
    e.preventDefault();
    handleDateChange(date);
    const formattedDate = DateUtils.getFormattedDateWith(format, date);
    props.setInputs((currentInputs: any) => {
      return {
        ...currentInputs,
        date: formattedDate,
      };
    });
  };

  return (
    <CRow className='mt-2'>
      <CCol sm={12} md={4} lg={3}>
        <CustomDatePicker
          id='public-holiday-date'
          label='Choose Date'
          placeholder='Choose Date'
          name='date'
          required={true}
          onChange={handlePublicHolidaySelect}
          selectedDate={selectedDate}
          dateFormat={format}
          error={props.errors?.date}
          {...props}
        />
      </CCol>
    </CRow>
  );
};
export default PublicHolidayBooking;
