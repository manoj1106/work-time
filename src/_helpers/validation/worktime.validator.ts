import { injectable } from 'tsyringe';
import { WorktimeConfig } from '../models/worktime.model';
import { StringUtils } from '../utils/string.utils';
import { NumberUtils } from '../utils/number.utils';

@injectable()
export class WorktimeConfigValidator {
  validateInputs = (
    inputs: WorktimeConfig,
    setErrors: (errors: any) => void
  ) => {
    console.log(JSON.stringify(inputs));
    let errors: any = {};
    let error = 'Positive value required';
    const monthlyTargetHours = +inputs.monthlyTargetHours;
    if (NumberUtils.isNotPositive(monthlyTargetHours)) {
      errors['monthlyTargetHours'] = error;
    }

    const weeklyTargetHours = +inputs.weeklyTargetHours;
    if (NumberUtils.isNotPositive(weeklyTargetHours)) {
      errors['weeklyTargetHours'] = error;
    }

    const dailyTargetHours = +inputs.dailyTargetHours;
    if (NumberUtils.isNotPositive(dailyTargetHours)) {
      errors['dailyTargetHours'] = error;
    }

    const defaultBreakTime = +inputs.defaultBreakTime;
    if (NumberUtils.isNegative(defaultBreakTime)) {
      errors['defaultBreakTime'] = error;
    }

    const yearlyVacationDays = +inputs.yearlyVacationDays;
    if (NumberUtils.isNotPositive(yearlyVacationDays)) {
      errors['yearlyVacationDays'] = error;
    }

    const vacationHours = +inputs.vacationHours;
    if (NumberUtils.isNotPositive(vacationHours)) {
      errors['vacationHours'] = error;
    }

    setErrors(errors);
    return StringUtils.isEmptyObject(errors);
  };
}
