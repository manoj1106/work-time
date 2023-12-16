import { injectable } from 'tsyringe';
import { NewBooking } from '../models/new-booking.model';
import { StringUtils } from '../utils/string.utils';

@injectable()
export class PublicHolidayTypeBookingValidator {
  public constructor() {}

  validateInputs = (inputs: NewBooking) => {
    let errors: any = {};
    if (StringUtils.isBlank(inputs.date)) {
      errors['date'] = 'Public holiday date is required';
    }
    return errors;
  };
}
