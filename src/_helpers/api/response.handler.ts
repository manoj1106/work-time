import { autoInjectable } from 'tsyringe';
import { ApiResponse } from './response.model';
import { ResponseType } from '../enums/response.type';

@autoInjectable()
export class ResponseHandler {
  /**
   *
   * @param msg message to be displayed on successful response
   * @param payload payload to be sent as response
   * @returns apiResponse
   *
   */
  getSuccessResponse = (msg: string, payload: any): ApiResponse => {
    return this.getApiResponse(true, true, msg, ResponseType.SUCCESS, payload);
  };

  /**
   *
   * @param notify if a user to be notified about the info response or not
   * @param msg message to be displayed on info response
   * @param payload payload to be sent as response
   * @returns apiResponse
   *
   */
  getInfoResponse = (
    notify: boolean,
    msg: string,
    payload: any
  ): ApiResponse => {
    return this.getApiResponse(true, notify, msg, ResponseType.INFO, payload);
  };

  /**
   *
   * @param msg message to be displayed on error response
   * @returns apiResponse
   *
   */
  getErrorResponse = (msg: string): ApiResponse => {
    return this.getApiResponse(false, true, msg, ResponseType.ERROR);
  };

  /**
   *
   * @param notify if a user to be notified about the info response or not
   * @param msg message to be displayed on warning response
   * @param payload payload to be sent as response
   * @returns apiResponse
   */
  getWarningResponse = (
    notify: boolean,
    msg: string,
    payload: any
  ): ApiResponse => {
    return this.getApiResponse(false, notify, msg, payload);
  };

  /**
   *
   * @param success sucess or error
   * @param notify if a user to be notified about the response or not
   * @param msg message to be displayed
   * @param type response type
   * @param payload payload to be sent in response
   * @returns apiResponse
   */
  private getApiResponse = (
    success: boolean,
    notify: boolean,
    msg: string,
    type: ResponseType,
    payload?: any
  ): ApiResponse => {
    const apiResponse: ApiResponse = {
      success: success,
      notify: notify,
      msg: msg,
      type: type,
      payload: payload,
    };
    return apiResponse;
  };

  /**
   *
   * @returns default apiResponse
   *
   */
  public getDefaultErrorResponse = () => {
    let apiResponse: ApiResponse = {
      success: false,
      notify: true,
      type: ResponseType.ERROR,
      msg: 'Could not processs request as invalid request received.',
    };
    return apiResponse;
  };
}
