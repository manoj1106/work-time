import { useInput } from './useInput';
import React, { useEffect } from 'react';
import useWorktimeConfigStore from '@/store/useWorktimeConfigStore';
import { WorktimeConfig } from '../models/worktime.model';
import { NumberUtils } from '../utils/number.utils';
import { ApiResponse } from '../api/response.model';
import { findWorktimeConfig } from '@/client/service-wrapper/worktime.service';

const initialWorktimeConfig: WorktimeConfig = {
  id: '',
  monthlyTargetHours: 0.0,
  weeklyTargetHours: 0.0,
  dailyTargetHours: 0.0,
  defaultBreakTime: 0.0,
  yearlyVacationDays: 0,
  vacationHours: 0.0,
};

const useWorktimeConfig = () => {
  const {
    inputs,
    errors,
    setInputs,
    setErrors,
    handleInputChange,
    handleResetInput,
  } = useInput(initialWorktimeConfig);
  const store = useWorktimeConfigStore();

  useEffect(() => {
    console.log('use effect triggered !!!');
    findWorktimeConfigOnLoad();
  }, []);

  const findWorktimeConfigOnLoad = async () => {
    if (!store.worktimeConfig) {
      const apiResponse: ApiResponse = await findWorktimeConfig();
      if (apiResponse && apiResponse.success && apiResponse.payload) {
        store.setWorktimeConfig(apiResponse.payload);
        setInputs(apiResponse.payload);
      }
    }
    if (store.worktimeConfig) {
      setInputs(store.worktimeConfig);
    }
  };

  const handleWeeklyHoursBlur = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    if (value) {
      const numericValue = +value;
      const dailyHours = NumberUtils.divide(numericValue, 5);
      setErrors((currentErrors: any) => ({
        ...currentErrors,
        weeklyTargetHours: '',
        dailyTargetHours: '',
      }));
      setInputs((currentInputs: WorktimeConfig) => ({
        ...currentInputs,
        dailyTargetHours: dailyHours,
      }));
    } else {
      setInputs((currentInputs: WorktimeConfig) => ({
        ...currentInputs,
        dailyTargetHours: 0,
      }));
    }
  };

  const handleDailyHoursBlur = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    if (value) {
      const numericValue = +value;
      const weeklyHours = NumberUtils.multiply(numericValue, 5);
      setErrors((currentErrors: any) => ({
        ...currentErrors,
        weeklyTargetHours: '',
        dailyTargetHours: '',
      }));
      setInputs((currentInputs: WorktimeConfig) => ({
        ...currentInputs,
        weeklyTargetHours: weeklyHours,
      }));
    } else {
      setInputs((currentInputs: WorktimeConfig) => ({
        ...currentInputs,
        weeklyTargetHours: 0,
      }));
    }
  };

  const handleWorktimeConfigReset = async () => {
    await findWorktimeConfigOnLoad();
    if (!store.worktimeConfig) {
      handleResetInput(initialWorktimeConfig);
    }
  };

  return {
    inputs,
    errors,
    setErrors,
    handleInputChange,
    handleWeeklyHoursBlur,
    handleDailyHoursBlur,
    handleWorktimeConfigReset,
  };
};

export default useWorktimeConfig;
