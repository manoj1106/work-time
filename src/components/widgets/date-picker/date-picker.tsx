import { Fragment, forwardRef } from 'react';
import FormLabel from '../form-label/form-label';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './date-picker.scss';

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

  const DatePickerInput = forwardRef((inputProps: InputProps, ref: any) => (
    <div
      className='input-group mb-3 has-validation'
      onClick={inputProps.onClick}
    >
      <input
        className='form-control datepicker-icon'
        value={inputProps.value}
        onChange={inputProps.onChange}
        ref={ref}
        placeholder={placeholder}
        readOnly={true}
      ></input>
    </div>
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
