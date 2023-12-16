import { useMultidatePicker } from '@/_helpers/hooks/useMultidatePicker';
import { NewBooking } from '@/_helpers/models/new-booking.model';
import { DateUtils } from '@/_helpers/utils/date-utils';
import CustomDatePicker from '@/components/widgets/date-picker/date-picker';
import { CCol, CRow } from '@coreui/react';

interface SickLeaveBookingProps {
  inputs: NewBooking;
  errors?: any;
  handleChange: (e: any) => void;
  setInputs: (inputs: any) => void;
}

const initialDates = {
  fromDate: '',
  toDate: '',
};
const format = DateUtils.DDMMYYYY_HIPHAN;

const SickLeaveBooking = (props: SickLeaveBookingProps) => {
  const { selectedDates, handleDateChange } = useMultidatePicker(initialDates);

  function handleDateSelect(name: string, d: Date) {
    handleDateChange(name, d);
    const selectedDate = DateUtils.getFormattedDateWith(format, d);
    props.setInputs((currentInputs: any) => {
      return {
        ...currentInputs,
        [name]: selectedDate,
      };
    });
  }

  return (
    <CRow className='mt-2'>
      <CCol sm={12} md={4} lg={3}>
        <CustomDatePicker
          id='sick-leave-fromDate'
          label='From Date'
          placeholder='From Date'
          name='fromDate'
          required={true}
          selectedDate={selectedDates.fromDate}
          onChange={(d) => handleDateSelect('fromDate', d)}
          dateFormat={format}
          error={props.errors?.fromDate}
          {...props}
        />
      </CCol>
      <CCol sm={12} md={4} lg={3}>
        <CustomDatePicker
          id='sick-leave-toDate'
          label='To Date'
          placeholder='To Date'
          name='toDate'
          required={true}
          selectedDate={selectedDates.toDate}
          onChange={(d) => handleDateSelect('toDate', d)}
          dateFormat={format}
          error={props.errors?.toDate}
          {...props}
        />
      </CCol>
    </CRow>
  );
};
export default SickLeaveBooking;
