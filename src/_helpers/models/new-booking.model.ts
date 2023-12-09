import { TimesheetType } from '../enums/timesheet.type';

export interface NewBooking {
  id?: string;
  year?: number;
  month?: string;
  type: TimesheetType;
  date: string;
  fromTime?: string;
  toTime?: string;
  breakTime?: string;
  fromDate?: string;
  toDate?: string;
  breakTimeHrs?: number;
  workingTime?: string;
  workingTimeHrs?: number;
  actualWorkingTime?: string;
  actualWorkingHours?: number;
  extraWorkingTime?: string;
  extraWorkingHours?: number;
}
