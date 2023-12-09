import 'reflect-metadata';
import { container } from 'tsyringe';
import { TIMESHEET_TYPES } from '@/_helpers/enums/timesheet.type';
import {
  initialNewBooking,
  useNewBooking,
} from '@/_helpers/hooks/useNewBooking';
import Card from '@/components/widgets/card/card';
import Select from '@/components/widgets/select/select';
import { CButton, CCol, CForm, CRow } from '@coreui/react';
import BookingTypes from './booking-types';
import { NewBookingValidator } from '@/_helpers/validation/new-booking.validator';
import { saveNewBooking } from '@/client/service-wrapper/new-booking.service';
import { StringUtils } from '@/_helpers/utils/string.utils';

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
    handleResetInput,
    notificationCtx,
  } = useNewBooking();

  const newBookingValidator = container.resolve(NewBookingValidator);

  const handleTypeSelect = (e: React.FormEvent<HTMLSelectElement>) => {
    if (StringUtils.isBlank(inputs.type)) {
      setErrors({});
      setInputs(initialNewBooking);
    }
    handleInputChange(e);
  };

  const resetInputs = () => {
    handleResetInput(initialNewBooking);
  };

  const handleNewBookingSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newBookingValidator.validateInputs(inputs, setErrors)) {
      console.log('There are no errors. Good to go !!!');
      const response = await saveNewBooking(inputs);
      notificationCtx.notify(response.notify, response.type, response.msg);
    }
  };

  return (
    <Card headers={headers}>
      <CForm onSubmit={handleNewBookingSave} noValidate>
        <CRow>
          <CCol sm={12} md={4} lg={3}>
            <Select
              id='type'
              name='type'
              value={inputs.type}
              required={true}
              label='Select Booking Type'
              onChange={handleTypeSelect}
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
        {inputs.type && (
          <CRow className='mt-4'>
            <CCol sm={6} md={4} lg={3}>
              <div className='d-grid pt-2'>
                <CButton color='success' className='px-4' type='submit'>
                  Save
                </CButton>
              </div>
            </CCol>
            <CCol sm={6} md={4} lg={3}>
              <div className='d-grid pt-2'>
                <CButton
                  color='danger'
                  className='px-4'
                  type='button'
                  onClick={resetInputs}
                >
                  Reset
                </CButton>
              </div>
            </CCol>
          </CRow>
        )}
      </CForm>
    </Card>
  );
};
export default NewBooking;
