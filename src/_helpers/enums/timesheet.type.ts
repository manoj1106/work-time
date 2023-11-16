import { SelectOption } from '@/components/widgets/select/select';

export const TIMESHEET_TYPES: SelectOption[] = [
  {
    title: 'Present',
    value: 'present',
  },
  {
    title: 'Public Holiday',
    value: 'public_holiday',
  },
  {
    title: 'Sick Leave',
    value: 'sick_leave',
  },
  {
    title: 'Time Compensation',
    value: 'time_compensation',
  },
  {
    title: 'Time Sick Leave',
    value: 'time_sick_leave',
  },
  {
    title: 'Vacation',
    value: 'vacation',
  },
];

export enum TimesheetType {
  PLEASE_SELECT = '',
  PRESENT = 'present',
  PUBLIC_HOLIDAY = 'public_holiday',
  VACATION = 'vacation',
  SICK_LEAVE = 'sick_leave',
  TIME_SICK_LEAVE = 'time_sick_leave',
  TIME_COMPENSATION = 'time_compensation',
}

export const TimesheetDescription = {
  present: 'Present',
  public_holiday: 'Public Holiday',
  time_compensation: 'Time Compensation',
  time_sick_leave: 'Time Sick Leave',
  sick_leave: 'Sick Leave',
  vacation: 'Vacation',
};
