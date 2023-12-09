import { ApiResponse } from '@/_helpers/api/response.model';
import { NewBooking } from '@/_helpers/models/new-booking.model';

export interface IPublicHolidayTypeBookingService {
  savePublicHolidayTypeBooking(booking: NewBooking): Promise<ApiResponse>;
}
