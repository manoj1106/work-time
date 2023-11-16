export const WorktimeConfigType: any = {
  monthlyTargetHours: 'Monthly Target Hours' as string,
  weeklyTargetHours: 'Weekly Target Hours' as string,
  dailyTargetHours: 'Daily Target Hours' as string,
  defaultBreakTime: 'Default Break Time' as string,
  yearlyVacationDays: 'Yearly Vacation Days' as string,
  vacationHours: 'Vacation Hours' as string,
};

export interface WorktimeConfig {
  id: string | undefined | null;
  monthlyTargetHours: number;
  weeklyTargetHours: number;
  dailyTargetHours: number;
  defaultBreakTime: number;
  yearlyVacationDays: number;
  vacationHours: number;
}
