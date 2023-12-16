'use server';
import 'reflect-metadata';
import { container } from 'tsyringe';
import { ApiResponse } from '@/_helpers/api/response.model';
import { NewBooking } from '@/_helpers/models/new-booking.model';
import { TimesheetType } from '@/_helpers/enums/timesheet.type';
import { PresentTypeService } from '@/server/service/impl/present.type.service.impl';
import { ResponseHandler } from '@/_helpers/api/response.handler';
import { PublicHolidayTypeBookingService } from '@/server/service/impl/public-holiday.type.service.impl';
import { SickLeaveBookingTypeService } from '@/server/service/impl/sick-leave.type.service.impl';

const saveNewBooking = async (booking: NewBooking): Promise<ApiResponse> => {
  console.log('saveNewBooking() - saving booking');
  const responseHandler = container.resolve(ResponseHandler);
  try {
    let service = undefined;
    switch (booking.type) {
      case TimesheetType.PRESENT:
        service = container.resolve(PresentTypeService);
        return await service.savePresentTypeBooking(booking);
      case TimesheetType.PUBLIC_HOLIDAY:
        service = container.resolve(PublicHolidayTypeBookingService);
        return await service.savePublicHolidayTypeBooking(booking);
      case TimesheetType.SICK_LEAVE:
        service = container.resolve(SickLeaveBookingTypeService);
        return await service.saveSickLeaveTypeBooking(booking);
    }
  } catch (error: any) {
    return responseHandler.getErrorResponse(error.message);
  }
  return responseHandler.getDefaultErrorResponse();
};

export { saveNewBooking };
