import { NewBooking } from '@/_helpers/models/new-booking.model';
import { IPresentTypeRepository } from '../present.type.repository';
import { autoInjectable } from 'tsyringe';
import { DBRepository } from './db.repository.impl';
import { TimesheetType } from '@/_helpers/enums/timesheet.type';

@autoInjectable()
export class PresentTypeBookingRepository implements IPresentTypeRepository {
  private readonly BOOKINGS_COLLECTION = 'bookings';
  private dbRepository: DBRepository;

  public constructor(dbRepository: DBRepository) {
    this.dbRepository = dbRepository;
  }

  /**
   *
   * @param id id of the document stored in database
   * @returns booking found for the id
   *
   */
  findById = async (id: string): Promise<NewBooking> => {
    const filter = {
      _id: id,
    };
    const booking: NewBooking = await this.dbRepository.findDoc(
      this.BOOKINGS_COLLECTION,
      filter
    );
    return booking;
  };

  findBooking = async (
    type: TimesheetType,
    date: string
  ): Promise<NewBooking> => {
    const filter = {
      type: type,
      date: date,
    };
    const booking: NewBooking = await this.dbRepository.findDoc(
      this.BOOKINGS_COLLECTION,
      filter
    );
    return booking;
  };

  savePresentTypeBooking = async (booking: NewBooking): Promise<NewBooking> => {
    const result = await this.dbRepository.saveDoc(
      this.BOOKINGS_COLLECTION,
      booking
    );
    if (result.acknowledged) {
      booking.id = result.insertedId.toString();
      return booking;
    }
    throw new Error('Something went wrong while saving the booking');
  };

  updatePresentTypeBooking = async (
    id: string,
    booking: NewBooking
  ): Promise<NewBooking> => {
    const result = await this.dbRepository.updateDoc(
      this.BOOKINGS_COLLECTION,
      booking,
      id
    );
    if (result.acknowledged) {
      booking.id = id;
      return booking;
    }
    throw new Error('Something went wrong while saving the booking');
  };
}
