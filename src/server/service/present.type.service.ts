import { ApiResponse } from '@/_helpers/api/response.model';
import { NewBooking } from '@/_helpers/models/new-booking.model';

export interface IPresentTypeService {
  savePresentTypeBooking(booking: NewBooking): Promise<ApiResponse>;
}
