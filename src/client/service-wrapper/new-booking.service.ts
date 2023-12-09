'use server';
import 'reflect-metadata';
import { container } from 'tsyringe';
import { ApiResponse } from '@/_helpers/api/response.model';
import { NewBooking } from '@/_helpers/models/new-booking.model';
import { TimesheetType } from '@/_helpers/enums/timesheet.type';
import { PresentTypeService } from '@/server/service/impl/present.type.service.impl';
import { ResponseType } from '@/_helpers/enums/response.type';
import { ResponseHandler } from '@/_helpers/api/response.handler';

const saveNewBooking = async (booking: NewBooking): Promise<ApiResponse> => {
  console.log('saveNewBooking() - saving booking');
  const responseHandler = container.resolve(ResponseHandler);
  try {
    switch (booking.type) {
      case TimesheetType.PRESENT:
        const presentTypeService = container.resolve(PresentTypeService);
        return await presentTypeService.savePresentTypeBooking(booking);
    }
  } catch (error: any) {
    return responseHandler.getErrorResponse(error.message);
  }
  return responseHandler.getDefaultErrorResponse();
};

export { saveNewBooking };
