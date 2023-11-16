import { TIMESHEET_TYPES } from '@/_helpers/enums/timesheet.type';
import { useNewBooking } from '@/_helpers/hooks/useNewBooking';
import Card from '@/components/widgets/card/card';
import Select from '@/components/widgets/select/select';
import { CCol, CForm, CRow } from '@coreui/react';
import BookingTypes from './booking-types';

const headers = {
  title: 'New Booking',
  subtitle: 'Please make your booking',
};

const NewBooking = () => {
  const {
    inputs,
    setInputs,
    errors,
    setErrors,
    handleInputChange,
    notificationCtx,
  } = useNewBooking();
  const handleNewBookingSave = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Card headers={headers}>
      <CForm onSubmit={handleNewBookingSave}>
        <CRow>
          <CCol sm={12} md={4} lg={3}>
            <Select
              id='type'
              name='type'
              value={inputs.type}
              required={true}
              label='Select Booking Type'
              onChange={handleInputChange}
              options={TIMESHEET_TYPES}
            />
          </CCol>
        </CRow>
        <BookingTypes
          inputs={inputs}
          type={inputs.type}
          setInputs={setInputs}
          errors={errors}
          onChange={handleInputChange}
        />
      </CForm>
    </Card>
  );
};
export default NewBooking;
