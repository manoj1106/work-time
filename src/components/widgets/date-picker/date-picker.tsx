import { forwardRef } from 'react';
import FormLabel from '../form-label/form-label';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './date-picker.scss';
import { CFormFeedback, CFormInput, CInputGroup } from '@coreui/react';

interface CustomDatePickerProps {
  id: string;
  required?: boolean;
  label: string;
  placeholder: string;
  selectedDate: any;
  name: string;
  onChange: (date: any, e: any) => void;
  dateFormat: string;
  isClearable?: boolean;
  error?: string;
}

interface InputProps {
  value?: any;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => any;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => any;
}

const CustomDatePicker = (props: CustomDatePickerProps) => {
  const {
    id,
    required,
    label,
    placeholder,
    selectedDate,
    onChange,
    name,
    ...rest
  } = props;
  const inputId = `input_${id}`;
  const DatePickerInput = forwardRef((inputProps: InputProps, ref: any) => (
    // <div
    //   className='input-group mb-3 has-validation'
    //   onClick={inputProps.onClick}
    // >
    //   <input
    //     className='form-control datepicker-icon'
    //     value={inputProps.value}
    //     onChange={inputProps.onChange}
    //     ref={ref}
    //     placeholder={placeholder}
    //     readOnly={true}
    //   ></input>
    //   {props.error && <CFormFeedback invalid>{props.error}</CFormFeedback>}
    // </div>

    <CInputGroup className='mb-3 has-validation'>
      <CFormInput
        className='datepicker-icon'
        id={inputId}
        type='text'
        placeholder={props.placeholder}
        autoComplete={props.id}
        name={props.name}
        value={inputProps.value}
        onChange={inputProps.onChange}
        required={props.required}
        onClick={inputProps.onClick}
        readOnly={true}
        {...(props.error && { invalid: true })}
      />
      {props.error && <CFormFeedback invalid>{props.error}</CFormFeedback>}
    </CInputGroup>
  ));

  return (
    <div className='custom-date-picker'>
      <FormLabel id={id} required={required} label={label} />
      <DatePicker
        selected={selectedDate}
        onChange={(date: any, e: any) => props.onChange(date, e)}
        customInput={<DatePickerInput />}
        todayButton='TODAY'
        dropdownMode='select'
        showMonthDropdown
        showYearDropdown
        adjustDateOnChange
        {...rest}
      />
    </div>
  );
};
export default CustomDatePicker;
