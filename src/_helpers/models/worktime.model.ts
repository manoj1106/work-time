export interface WorktimeConfig {
  id: string | undefined | null;
  monthlyTargetHours: number;
  weeklyTargetHours: number;
  dailyTargetHours: number;
  defaultBreakTime: number;
  yearlyVacationDays: number;
  vacationHours: number;
}
