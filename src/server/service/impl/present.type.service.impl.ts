'use server';

import { injectable } from 'tsyringe';
import { IPresentTypeService } from '../present.type.service';
import { ApiResponse } from '@/_helpers/api/response.model';
import { NewBooking } from '@/_helpers/models/new-booking.model';
import { ResponseHandler } from '@/_helpers/api/response.handler';
import { StringUtils } from '@/_helpers/utils/string.utils';
import { TimesheetType } from '@/_helpers/enums/timesheet.type';
import { TimeUtils } from '@/_helpers/utils/time-util';
import { DateUtils } from '@/_helpers/utils/date-utils';
import { WorktimeRepository } from '@/server/repository/impl/worktime.repository.impl';
import { WorktimeConfig } from '@/_helpers/models/worktime.model';
import { NumberUtils } from '@/_helpers/utils/number.utils';
import { NewBookingRepository } from '@/server/repository/impl/new-booking.repository.impl';
import { ErrorMsg } from '@/server/consts/error.msg.consts';
import { MsgConsts } from '@/server/consts/msg.consts';

@injectable()
export class PresentTypeService implements IPresentTypeService {
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
  public savePresentTypeBooking = async (
    booking: NewBooking
  ): Promise<ApiResponse> => {
    console.log('savePresentTypeBooking() - saving present type booking');
    this.validatePresentTypeBooking(booking);
    const worktimeConfig = await this.worktimeRepository.findWorktimeConfig();
    if (!worktimeConfig) {
      throw new Error(ErrorMsg.WORKTIME_CONFIG_EMPTY_MSG);
    }
    if (!worktimeConfig.dailyTargetHours) {
      throw new Error(ErrorMsg.WORKTIME_CONFIG_DAILY_HOURS_EMPTY_MSG);
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

  private validatePresentTypeBooking = (booking: NewBooking) => {
    if (StringUtils.isNullOrUndefined(booking.type)) {
      throw new Error(ErrorMsg.BOOKING_TYPE_EMPTY_MSG);
    } else if (booking.type && TimesheetType.PRESENT !== booking.type) {
      throw new Error(ErrorMsg.BOOKING_TYPE_INVALID_MSG);
    } else if (StringUtils.isBlank(booking.fromTime)) {
      throw new Error(ErrorMsg.FROM_TIME_EMPTY_MSG);
    } else if (!TimeUtils.isTimeValid(booking.fromTime)) {
      throw new Error(ErrorMsg.FROM_TIME_INVALID_MSG);
    } else if (StringUtils.isBlank(booking.toTime)) {
      throw new Error(ErrorMsg.TO_TIME_EMPTY_MSG);
    } else if (!TimeUtils.isTimeValid(booking.toTime)) {
      throw new Error(ErrorMsg.TO_TIME_INVALID_MSG);
    }
  };

  private getBooking = (
    booking: NewBooking,
    worktimeConfig: WorktimeConfig
  ) => {
    const fromTime = booking.fromTime;
    const toTime = booking.toTime;
    const parsedDate = DateUtils.parseDate(booking.date);
    const year = parsedDate.getFullYear();
    const month = DateUtils.getFullMonth(parsedDate.getMonth());
    const breakTime = TimeUtils.getTime(booking.breakTime);
    const breakTimeHrs = TimeUtils.convertTimeToHours(breakTime);
    const workingTime = TimeUtils.getTimeDifference(fromTime, toTime);
    const workingTimeHrs = TimeUtils.convertTimeToHours(workingTime);
    const actualWorkingTime = TimeUtils.getTimeDifference(
      breakTime,
      workingTime
    );
    const actualWorkingHours = TimeUtils.convertTimeToHours(actualWorkingTime);

    const dailyHours = worktimeConfig.dailyTargetHours;

    const extraWorkingHours = NumberUtils.subtracton(
      actualWorkingHours,
      dailyHours
    );
    const extraWorkingTime = TimeUtils.convertHoursToTime(extraWorkingHours);

    const doc: NewBooking = {
      date: booking.date,
      type: booking.type,
      fromTime: fromTime,
      toTime: toTime,
      month: month,
      year: year,
      breakTime: breakTime,
      breakTimeHrs: breakTimeHrs,
      workingTime: workingTime,
      workingTimeHrs: workingTimeHrs,
      actualWorkingTime: actualWorkingTime,
      actualWorkingHours: actualWorkingHours,
      extraWorkingTime: extraWorkingTime,
      extraWorkingHours: extraWorkingHours,
      comment: booking.comment,
    };
    return doc;
  };
}
