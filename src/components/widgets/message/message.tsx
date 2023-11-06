import { Fragment } from 'react';
import { ApiResponse } from '@/_helpers/api/response.model';
import { ResponseType } from '@/_helpers/enums/response.type';

interface MessageProps {
  response: ApiResponse | undefined;
}
const Message = (props: MessageProps) => {
  if (props.response) {
    if (props.response.type === ResponseType.ERROR) {
      return <span className='text-danger'>{props.response.msg}</span>;
    }
    if (props.response.type === ResponseType.SUCCESS) {
      return <span className='text-success'>{props.response.msg}</span>;
    }
    if (props.response.type === ResponseType.INFO && props.response.notify) {
      return <span className='text-info'>{props.response.msg}</span>;
    }
    if (props.response.type === ResponseType.WARNING && props.response.notify) {
      return <span className='text-warning'>{props.response.msg}</span>;
    }
  }
  return <Fragment></Fragment>;
};
export default Message;
