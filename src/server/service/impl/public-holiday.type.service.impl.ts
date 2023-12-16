'use server';

import { injectable } from 'tsyringe';
import { ApiResponse } from '@/_helpers/api/response.model';
import { NewBooking } from '@/_helpers/models/new-booking.model';
import { ResponseHandler } from '@/_helpers/api/response.handler';
import { StringUtils } from '@/_helpers/utils/string.utils';
import { TimesheetType } from '@/_helpers/enums/timesheet.type';
import { TimeUtils } from '@/_helpers/utils/time-util';
import { DateUtils } from '@/_helpers/utils/date-utils';
import { WorktimeRepository } from '@/server/repository/impl/worktime.repository.impl';
import { WorktimeConfig } from '@/_helpers/models/worktime.model';
import { NewBookingRepository } from '@/server/repository/impl/new-booking.repository.impl';
import { ErrorMsg } from '@/server/consts/error.msg.consts';
import { MsgConsts } from '@/server/consts/msg.consts';
import { IPublicHolidayTypeBookingService } from '../public-holiday.type.service';

@injectable()
export class PublicHolidayTypeBookingService
  implements IPublicHolidayTypeBookingService
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
  /**
   *
   * @param booking booking object that needs to be saved to database
   * @returns apiResposne
   *
   */
  public savePublicHolidayTypeBooking = async (
    booking: NewBooking
  ): Promise<ApiResponse> => {
    console.log(
      'savePublicHolidayTypeBooking() - saving public holiday type booking'
    );
    this.validatePublicHolidayTypeBooking(booking);
    const worktimeConfig = await this.worktimeRepository.findWorktimeConfig();
    if (!worktimeConfig) {
      throw new Error(ErrorMsg.WORKTIME_CONFIG_EMPTY_MSG);
    }
    if (!worktimeConfig.vacationHours) {
      throw new Error(ErrorMsg.WORKTIME_CONFIG_VACATION_HOURS_EMPTY_MSG);
    }
    // the id
    const existingBooking = await this.newBookingRepository.findBooking(
      booking.type,
      booking.date
    );
    const now = DateUtils.now();

    if (!StringUtils.isEmptyObject(existingBooking)) {
      // booking already found.. needs to be updated
      const bookingToUpdate = this.getBooking(booking, worktimeConfig);
      bookingToUpdate.createdOn = existingBooking.createdOn;
      bookingToUpdate.updatedOn = now;
      if (existingBooking.id) {
        const updatedBooking = await this.newBookingRepository.updateBooking(
          existingBooking.id,
          bookingToUpdate
        );
        return this.responseHandler.getSuccessResponse(
          MsgConsts.BOOKING_UPDATE_MSG,
          updatedBooking
        );
      }
    } else {
      // no booking found save the booking
      const bookingToSave = this.getBooking(booking, worktimeConfig);
      bookingToSave.createdOn = now;
      bookingToSave.updatedOn = now;
      const savedBooking = await this.newBookingRepository.saveBooking(
        bookingToSave
      );
      return this.responseHandler.getSuccessResponse(
        MsgConsts.BOOKING_SAVE_MSG,
        savedBooking
      );
    }
    return this.responseHandler.getDefaultErrorResponse();
  };

  private validatePublicHolidayTypeBooking = (booking: NewBooking) => {
    if (StringUtils.isNullOrUndefined(booking.type)) {
      throw new Error(ErrorMsg.BOOKING_TYPE_EMPTY_MSG);
    } else if (booking.type && TimesheetType.PUBLIC_HOLIDAY !== booking.type) {
      throw new Error(ErrorMsg.BOOKING_TYPE_INVALID_MSG);
    }
  };

  private getBooking = (
    booking: NewBooking,
    worktimeConfig: WorktimeConfig
  ): NewBooking => {
    const parsedDate = DateUtils.parseDate(booking.date);
    const year = parsedDate.getFullYear();
    const month = DateUtils.getFullMonth(parsedDate.getMonth());
    const actualWorkingHours = +worktimeConfig.vacationHours;
    const actualWorkingTime = TimeUtils.convertHoursToTime(actualWorkingHours);

    const doc: NewBooking = {
      month: month,
      year: year,
      date: booking.date,
      type: booking.type,
      actualWorkingTime: actualWorkingTime,
      actualWorkingHours: actualWorkingHours,
    };
    return doc;
  };
}
