import { useDatepicker } from '@/_helpers/hooks/useDatepicker';
import { NewBooking } from '@/_helpers/models/new-booking.model';
import { DateUtils } from '@/_helpers/utils/date-utils';
import CustomDatePicker from '@/components/widgets/date-picker/date-picker';
import Input from '@/components/widgets/input/input';
import { CCol, CRow } from '@coreui/react';

interface PresentBookingProps {
  inputs: NewBooking;
  handleChange: (e: any) => void;
  setInputs: (inputs: any) => void;
}

const format = DateUtils.DDMMYYYY_HIPHAN;

const PresentBooking = (props: PresentBookingProps) => {
  const { selectedDate, handleDateChange } = useDatepicker();

  const handlePresentDateSelect = (date: Date, e: any) => {
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
          id='present-date'
          label='Choose Present Date'
          placeholder='Choose Present Date'
          name='date'
          required={true}
          onChange={handlePresentDateSelect}
          selectedDate={selectedDate}
          dateFormat={format}
          {...props}
        />
      </CCol>
      <CCol sm={12} md={4} lg={3}>
        <Input
          label='From Time'
          id='fromTime'
          name='fromTime'
          onChange={props.handleChange}
          value={props.inputs.fromTime}
          placeholder='From Time'
          required={true}
          type='time'
        />
      </CCol>
      <CCol sm={12} md={4} lg={3}>
        <Input
          label='To Time'
          id='toTime'
          name='toTime'
          onChange={props.handleChange}
          value={props.inputs.toTime}
          placeholder='To Time'
          required={true}
          type='time'
        />
      </CCol>
      <CCol sm={12} md={4} lg={3}>
        <Input
          label='Break Time'
          id='breakTime'
          name='breakTime'
          onChange={props.handleChange}
          value={props.inputs.breakTime}
          placeholder='Break Time'
          required={true}
          type='time'
        />
      </CCol>
    </CRow>
  );
};
export default PresentBooking;
