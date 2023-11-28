import { injectable } from 'tsyringe';
import { NewBooking } from '../models/new-booking.model';
import { StringUtils } from '../utils/string.utils';
import { PresentBookingValidator } from './present-booking.validator';
import { TimesheetType } from '../enums/timesheet.type';

@injectable()
export class NewBookingValidator {
  private presentBookingValidator: PresentBookingValidator;
  public constructor(presentBookingValidator: PresentBookingValidator) {
    this.presentBookingValidator = presentBookingValidator;
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
