import { TimesheetType } from '@/_helpers/enums/timesheet.type';
import { NewBooking } from '@/_helpers/models/new-booking.model';
import { Fragment } from 'react';
import PresentBooking from './present-booking';
import PublicHolidayBooking from './public-holiday-booking';
import SickLeaveBooking from './sick-leave-booking';
import TimeCompensationBooking from './time-compensation-booking';
import VacationBooking from './vacation-booking';

interface BookingTypesProps {
  type: TimesheetType;
  inputs: NewBooking;
  setInputs: (inputs: NewBooking) => void;
  errors: any;
  onChange: (e: any) => void;
}

const BookingTypes = (props: BookingTypesProps) => {
  switch (props.type) {
    case TimesheetType.PRESENT:
      return (
        <PresentBooking
          setInputs={props.setInputs}
          inputs={props.inputs}
          handleChange={props.onChange}
          errors={props.errors}
        />
      );
    case TimesheetType.PUBLIC_HOLIDAY:
      return <PublicHolidayBooking />;
    case TimesheetType.SICK_LEAVE:
      return <SickLeaveBooking />;
    case TimesheetType.TIME_COMPENSATION:
      return <TimeCompensationBooking />;
    case TimesheetType.VACATION:
      return <VacationBooking />;
    default:
      return <Fragment />;
  }
};
export default BookingTypes;
