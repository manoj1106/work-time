'use server';

import { injectable } from 'tsyringe';
import { IPresentTypeService } from '../present.type.service';
import { ApiResponse } from '@/_helpers/api/response.model';
import { NewBooking } from '@/_helpers/models/new-booking.model';
import { ResponseType } from '@/_helpers/enums/response.type';
import { ResponseHandler } from '@/_helpers/api/response.handler';
import { StringUtils } from '@/_helpers/utils/string.utils';
import { TimesheetType } from '@/_helpers/enums/timesheet.type';
import { PresentTypeBookingRepository } from '@/server/repository/impl/present.type.repository.impl';
import { TimeUtils } from '@/_helpers/utils/time-util';
import { DateUtils } from '@/_helpers/utils/date-utils';
import { WorktimeRepository } from '@/server/repository/impl/worktime.repository.impl';
import { WorktimeConfig } from '@/_helpers/models/worktime.model';
import { NumberUtils } from '@/_helpers/utils/number.utils';

@injectable()
export class PresentTypeService implements IPresentTypeService {
  private responseHandler: ResponseHandler;
  private presentTypeRepository: PresentTypeBookingRepository;
  private worktimeRepository: WorktimeRepository;

  public constructor(
    responseHandler: ResponseHandler,
    presentTypeRepository: PresentTypeBookingRepository,
    worktimeRepository: WorktimeRepository
  ) {
    this.responseHandler = responseHandler;
    this.presentTypeRepository = presentTypeRepository;
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
    const apiResponse: ApiResponse = {
      notify: true,
      success: true,
      msg: 'Boookings saved successfully.',
      type: ResponseType.SUCCESS,
      payload: undefined,
    };
    const msg = this.validatePresentTypeBooking(booking);
    console.log('savePresentTypeBooking() - msg : ' + msg);
    if (StringUtils.isNotBlank(msg)) {
      return this.responseHandler.getErrorResponse(msg);
    }

    const worktimeConfig = await this.worktimeRepository.findWorktimeConfig();
    if (!worktimeConfig) {
      return this.responseHandler.getErrorResponse(
        'Default Worktime Config could not be found in system. Please create default configuration first.'
      );
    }

    if (!worktimeConfig.dailyTargetHours) {
      return this.responseHandler.getErrorResponse(
        'Default Worktime Config Daily Target Hours are not set.'
      );
    }

    // the id
    const existingBooking = await this.presentTypeRepository.findBooking(
      booking.type,
      booking.date
    );
    if (!StringUtils.isEmptyObject(existingBooking)) {
      // booking already found.. needs to be updated
      const bookingToUpdate = this.getBooking(booking, worktimeConfig);
      if (existingBooking.id) {
        const updatedBooking =
          await this.presentTypeRepository.updatePresentTypeBooking(
            existingBooking.id,
            bookingToUpdate
          );
        return this.responseHandler.getSuccessResponse(
          'Booking updated successfully',
          updatedBooking
        );
      }
    } else {
      // no booking found save the booking
      const bookingToSave = this.getBooking(booking, worktimeConfig);
      const savedBooking =
        await this.presentTypeRepository.savePresentTypeBooking(bookingToSave);
      return this.responseHandler.getSuccessResponse(
        'Booking saved successfully',
        savedBooking
      );
    }
    return apiResponse;
  };

  private validatePresentTypeBooking = (booking: NewBooking) => {
    let msg = '';
    if (StringUtils.isNullOrUndefined(booking.type)) {
      msg = 'Booking type is not provided in request';
    } else if (
      !StringUtils.isNullOrUndefined(booking.type) &&
      TimesheetType.PRESENT !== booking.type
    ) {
      msg = 'Invalid value for booking type is provided in request';
    } else if (StringUtils.isBlank(booking.fromTime)) {
      msg = 'From Time is mandatory.';
    } else if (
      StringUtils.isNotBlank(booking.fromTime) &&
      TimeUtils.isTimeValid(booking.fromTime)
    ) {
      msg = 'Invalid From Time provided. HH:MM format is allowed.';
    } else if (StringUtils.isBlank(booking.toTime)) {
      msg = 'To Time is mandatory.';
    } else if (
      StringUtils.isNotBlank(booking.toTime) &&
      TimeUtils.isTimeValid(booking.toTime)
    ) {
      msg = 'Invalid To Time provided. HH:MM format is allowed.';
    }
    return msg;
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
    };
    return doc;
  };
}
