import { injectable } from 'tsyringe';
import { NewBooking } from '../models/new-booking.model';
import { StringUtils } from '../utils/string.utils';
import { PresentBookingValidator } from './present-booking.validator';
import { TimesheetType } from '../enums/timesheet.type';
import { PublicHolidayTypeBookingValidator } from './public-holiday-booking.validator';
import { SickLeaveTypeBookingValidator } from './sick-leave.booking.validator';

@injectable()
export class NewBookingValidator {
  private presentBookingValidator: PresentBookingValidator;
  private publicHolidayTypeBookingValidator: PublicHolidayTypeBookingValidator;
  private sickLeaveTypeBookingValidator: SickLeaveTypeBookingValidator;
  public constructor(
    presentBookingValidator: PresentBookingValidator,
    publicHolidayTypeBookingValidator: PublicHolidayTypeBookingValidator,
    sickLeaveTypeBookingValidator: SickLeaveTypeBookingValidator
  ) {
    this.presentBookingValidator = presentBookingValidator;
    this.publicHolidayTypeBookingValidator = publicHolidayTypeBookingValidator;
    this.sickLeaveTypeBookingValidator = sickLeaveTypeBookingValidator;
  }

  validateInputs = (inputs: NewBooking, setErrors: (errors: any) => void) => {
    let errors: any = {};
    if (StringUtils.isNullOrUndefined(inputs.type)) {
      errors['type'] = 'Booking type is required';
    }
    let bookingErrors: any = {};
    if (!StringUtils.isNullOrUndefined(inputs.type)) {
      switch (inputs.type) {
        case TimesheetType.PRESENT:
          bookingErrors = this.presentBookingValidator.validateInputs(inputs);
          break;
        case TimesheetType.SICK_LEAVE:
          bookingErrors =
            this.sickLeaveTypeBookingValidator.validateInputs(inputs);
          break;
        case TimesheetType.PUBLIC_HOLIDAY:
          bookingErrors =
            this.publicHolidayTypeBookingValidator.validateInputs(inputs);
          break;
      }
      errors = {
        ...errors,
        ...bookingErrors,
      };
    }
    setErrors(errors);
    return StringUtils.isEmptyObject(errors);
  };
}
