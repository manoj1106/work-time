import { NewBooking } from '@/_helpers/models/new-booking.model';

export interface IPresentTypeRepository {
  /**
   *
   * @param id id of the document stored in database
   * @returns booking found for the id
   *
   */
  findById(id: string): Promise<NewBooking>;

  /**
   *
   * @param type type of the booking
   * @param date date of the booking
   * @returns booking found for the type and date
   *
   */
  findBooking(type: string, date: string): Promise<NewBooking>;

  /**
   *
   * @param booking booking document that should be saved in database
   * @returns booking saved booking object with id
   *
   */
  savePresentTypeBooking(booking: NewBooking): Promise<NewBooking>;

  /**
   *
   * @param id id of the document that should be updated in database
   * @param booking booking document that should be updated in database
   * @returns booking updated booking object
   *
   */
  updatePresentTypeBooking(
    id: string,
    booking: NewBooking
  ): Promise<NewBooking>;
}
