import {
  CFormFeedback,
  CFormInput,
  CFormLabel,
  CInputGroup,
} from '@coreui/react';
import { Fragment } from 'react';
import FormLabel from '../form-label/form-label';

interface InputProps {
  id: string;
  label: string;
  type?: string;
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
      <FormLabel id={props.id} required={props.required} label={props.label} />
      <CInputGroup className='mb-3 has-validation'>
        <CFormInput
          id={props.id}
          type={props.type ? props.type : 'text'}
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
