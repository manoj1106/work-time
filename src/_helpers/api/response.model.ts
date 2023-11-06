import { ResponseType } from '../enums/response.type';

export interface ApiResponse {
  success: boolean;
  notify: boolean;
  msg: string;
  type: ResponseType;
  payload?: any;
}
