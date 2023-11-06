import {
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CInputGroup,
} from '@coreui/react';
import { Fragment } from 'react';

interface InputProps {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  name: string;
  value: any;
  required?: boolean;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  error?: string;
  rest?: any;
  onBlur?: (e: React.FormEvent<HTMLInputElement>) => void;
}
const Input = (props: InputProps) => {
  return (
    <Fragment>
      {props.label && (
        <CFormLabel htmlFor={props.id} className='text-dark'>
          <span>{props.label}</span>&nbsp;
          {props.required && <strong className='text-danger'>*</strong>}
        </CFormLabel>
      )}
      <CInputGroup className='mb-3 has-validation'>
        <CFormInput
          id={props.id}
          type={props.type}
          placeholder={props.placeholder}
          autoComplete={props.id}
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          required={props.required}
          {...(props.error && { invalid: true })}
          onBlur={props.onBlur}
          {...props.rest}
        />
        {props.error && <CFormFeedback invalid>{props.error}</CFormFeedback>}
      </CInputGroup>
    </Fragment>
  );
};
export default Input;
