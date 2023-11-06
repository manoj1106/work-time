'use client';
import { ApiResponse } from '@/_helpers/api/response.model';
import { WorktimeConfig } from '@/_helpers/models/worktime.model';
import { findWorktimeConfig } from '@/client/service-wrapper/worktime.service';
import { create } from 'zustand';

interface WorktimeConfigStore {
  worktimeConfig: WorktimeConfig | undefined;
  loading: boolean;
  findWorktimeConfig: () => Promise<void>;
  setWorktimeConfig: (worktimeConfig: WorktimeConfig) => void;
}

const useWorktimeConfigStore = create<WorktimeConfigStore>((set) => ({
  worktimeConfig: undefined,
  loading: true,
  async findWorktimeConfig() {
    const apiResponse: ApiResponse = await findWorktimeConfig();
    set((state) => ({
      ...state,
      loading: false,
      worktimeConfig: apiResponse.payload,
    }));
  },
  setWorktimeConfig(worktimeConfig: WorktimeConfig) {
    set((state) => ({ ...state, worktimeConfig: worktimeConfig }));
  },
}));

export default useWorktimeConfigStore;
