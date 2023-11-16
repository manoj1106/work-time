import { TimesheetType } from '../enums/timesheet.type';

export interface NewBooking {
  id?: string;
  type: TimesheetType | undefined;
  date: string;
  fromDate: string;
  toDate: string;
  fromTime: string;
  toTime: string;
  totalTime: string;
  totalHrs: string;
  breakTime: string;
}
