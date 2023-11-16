import { CFormLabel } from '@coreui/react';
import { Fragment } from 'react';

interface FormLabelProps {
  label: string;
  id: string;
  required?: boolean;
}

const FormLabel = (props: FormLabelProps) => {
  return (
    <Fragment>
      {props.label && (
        <CFormLabel htmlFor={props.id} className='text-dark'>
          <span>{props.label}</span>&nbsp;
          {props.required && <strong className='text-danger'>*</strong>}
        </CFormLabel>
      )}
    </Fragment>
  );
};
export default FormLabel;
