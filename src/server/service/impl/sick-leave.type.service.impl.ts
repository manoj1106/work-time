import { injectable } from 'tsyringe';
import { ISickLeaveBookingTypeService } from '../sick-leave.type.service';
import { ApiResponse } from '@/_helpers/api/response.model';
import { ResponseHandler } from '@/_helpers/api/response.handler';
import { NewBookingRepository } from '@/server/repository/impl/new-booking.repository.impl';
import { WorktimeRepository } from '@/server/repository/impl/worktime.repository.impl';
import { NewBooking } from '@/_helpers/models/new-booking.model';

@injectable()
export class SickLeaveBookingTypeService
  implements ISickLeaveBookingTypeService
{
  private responseHandler: ResponseHandler;
  private newBookingRepository: NewBookingRepository;
  private worktimeRepository: WorktimeRepository;

  public constructor(
    responseHandler: ResponseHandler,
    newBookingRepository: NewBookingRepository,
    worktimeRepository: WorktimeRepository
  ) {
    this.responseHandler = responseHandler;
    this.newBookingRepository = newBookingRepository;
    this.worktimeRepository = worktimeRepository;
  }

  public saveSickLeaveTypeBooking = async (
    booking: NewBooking
  ): Promise<ApiResponse> => {
    return this.responseHandler.getDefaultErrorResponse();
  };
}
