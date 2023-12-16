import { injectable } from 'tsyringe';
import { NewBooking } from '../models/new-booking.model';
import { StringUtils } from '../utils/string.utils';

@injectable()
export class SickLeaveTypeBookingValidator {
  public constructor() {}

  validateInputs = (inputs: NewBooking) => {
    let errors: any = {};
    if (StringUtils.isBlank(inputs.fromDate)) {
      errors['fromDate'] = 'From Date is required';
    }
    if (StringUtils.isBlank(inputs.toDate)) {
      errors['toDate'] = 'To Date is required';
    }
    return errors;
  };
}
