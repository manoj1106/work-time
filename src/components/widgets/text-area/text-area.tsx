import { CFormFeedback, CFormTextarea, CInputGroup } from '@coreui/react';
import { Fragment } from 'react';
import FormLabel from '../form-label/form-label';

interface TextAreaProps {
  id: string;
  required?: boolean;
  label: string;
  value: any;
  name: string;
  placeholder: string;
  onChange: (e: React.FormEvent<HTMLTextAreaElement>) => void;
}

const TextArea = (props: TextAreaProps) => {
  return (
    <Fragment>
      <FormLabel id={props.id} required={props.required} label={props.label} />
      <CInputGroup className='mb-3 has-validation'>
        <CFormTextarea
          id={props.id}
          name={props.name}
          value={props.value}
          placeholder={props.placeholder}
          onChange={props.onChange}
        />
      </CInputGroup>
    </Fragment>
  );
};
export default TextArea;
