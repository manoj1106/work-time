'use server';
import 'reflect-metadata';
import { container } from 'tsyringe';
import { ApiResponse } from '@/_helpers/api/response.model';
import { WorktimeService } from '@/server/service/impl/worktime.service.impl';
import { WorktimeConfig } from '@/_helpers/models/worktime.model';

const findWorktimeConfig = async (): Promise<ApiResponse> => {
  const worktimeService = container.resolve(WorktimeService);
  return await worktimeService.findWorktimeConfig();
};

const saveWorktimeConfig = async (
  worktimeConfig: WorktimeConfig
): Promise<ApiResponse> => {
  const worktimeService = container.resolve(WorktimeService);
  const payload: WorktimeConfig = {
    id: worktimeConfig.id,
    monthlyTargetHours: +worktimeConfig.monthlyTargetHours,
    weeklyTargetHours: +worktimeConfig.weeklyTargetHours,
    dailyTargetHours: +worktimeConfig.dailyTargetHours,
    defaultBreakTime: +worktimeConfig.defaultBreakTime,
    yearlyVacationDays: +worktimeConfig.yearlyVacationDays,
    vacationHours: +worktimeConfig.vacationHours,
  };
  return await worktimeService.saveOrUpdateWorktimeConfig(payload);
};

export { findWorktimeConfig, saveWorktimeConfig };
