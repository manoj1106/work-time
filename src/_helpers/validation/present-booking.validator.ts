import { injectable } from 'tsyringe';
import { NewBooking } from '../models/new-booking.model';
import { StringUtils } from '../utils/string.utils';

@injectable()
export class PresentBookingValidator {
  public constructor() {}

  validateInputs = (inputs: NewBooking) => {
    let errors: any = {};
    if (StringUtils.isBlank(inputs.date)) {
      errors['date'] = 'Present date is required';
    }
    if (StringUtils.isBlank(inputs.fromTime)) {
      errors['fromTime'] = 'From Time is required';
    }
    if (StringUtils.isBlank(inputs.toTime)) {
      errors['toTime'] = 'To Time is required';
    }
    return errors;
  };
}
