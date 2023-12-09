import { autoInjectable } from 'tsyringe';
import { INewBookingRepository } from '../new-booking.repository';
import { DBRepository } from './db.repository.impl';
import { NewBooking } from '@/_helpers/models/new-booking.model';
import { TimesheetType } from '@/_helpers/enums/timesheet.type';
import { ServerConsts } from '@/server/consts/server.consts';

@autoInjectable()
export class NewBookingRepository implements INewBookingRepository {
  private readonly BOOKINGS_COLLECTION = ServerConsts.BOOKINGS_COLLECTION;
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

  saveBooking = async (booking: NewBooking): Promise<NewBooking> => {
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

  updateBooking = async (
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
    throw new Error('Something went wrong while updating the booking');
  };
}
