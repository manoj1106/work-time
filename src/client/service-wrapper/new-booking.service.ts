'use server';
import 'reflect-metadata';
import { container } from 'tsyringe';
import { ApiResponse } from '@/_helpers/api/response.model';
import { NewBooking } from '@/_helpers/models/new-booking.model';
import { ResponseType } from '@/_helpers/enums/response.type';

const saveNewBooking = async (booking: NewBooking): Promise<ApiResponse> => {
  const apiResponse: ApiResponse = {
    notify: true,
    success: true,
    msg: 'Boookings saved successfully.',
    type: ResponseType.SUCCESS,
    payload: undefined,
  };
  return apiResponse;
};

export { saveNewBooking };
