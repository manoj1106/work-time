export class ErrorMsg {
  private constructor() {}
  // worktime config
  public static readonly WORKTIME_CONFIG_EMPTY_MSG =
    'Default Worktime Config could not be found in system. Please create default configuration first';
  public static readonly WORKTIME_CONFIG_DAILY_HOURS_EMPTY_MSG =
    'Default Worktime Config Daily Target Hours are not set';
  public static readonly WORKTIME_CONFIG_VACATION_HOURS_EMPTY_MSG =
    'Default Worktime Config Vacation Hours are not set';
  // new bookings error msg
  public static readonly BOOKING_TYPE_EMPTY_MSG =
    'Booking type is not provided in request';
  public static readonly BOOKING_TYPE_INVALID_MSG =
    'Invalid value for booking type is provided in request';
  public static readonly FROM_TIME_EMPTY_MSG = 'From Time is mandatory';
  public static readonly FROM_TIME_INVALID_MSG =
    'Invalid From Time provided. HH:MM format is allowed';
  public static readonly TO_TIME_EMPTY_MSG = 'To Time is mandatory';
  public static readonly TO_TIME_INVALID_MSG =
    'Invalid To Time provided. HH:MM format is allowed';
}
