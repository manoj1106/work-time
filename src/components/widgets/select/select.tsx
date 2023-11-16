import { CFormFeedback, CFormSelect, CInputGroup } from '@coreui/react';
import { Fragment } from 'react';
import FormLabel from '../form-label/form-label';

export interface SelectOption {
  title: string;
  value: string;
}

interface SelectProps {
  id: string;
  label: string;
  required?: boolean;
  name: string;
  value: any;
  error?: string;
  onChange: (e: React.FormEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
}

const Select = (props: SelectProps) => {
  return (
    <Fragment>
      <FormLabel id={props.id} required={props.required} label={props.label} />
      <CInputGroup className='mb-3 has-validation'>
        <CFormSelect
          id={props.id}
          name={props.name}
          value={props.value}
          required={props.required}
          onChange={props.onChange}
        >
          <option value=''>Please Select</option>
          {props.options &&
            props.options.length > 0 &&
            props.options.map((selectOption: SelectOption) => (
              <option key={selectOption.value} value={selectOption.value}>
                {selectOption.title}
              </option>
            ))}
        </CFormSelect>
        {props.error && <CFormFeedback invalid>{props.error}</CFormFeedback>}
      </CInputGroup>
    </Fragment>
  );
};

export default Select;
