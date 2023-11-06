import { ApiResponse } from '@/_helpers/api/response.model';
import { WorktimeConfig } from '@/_helpers/models/worktime.model';

export interface IWorktimeService {
  findWorktimeConfig(): Promise<ApiResponse>;
  saveOrUpdateWorktimeConfig(
    worktimeConfig: WorktimeConfig
  ): Promise<ApiResponse>;
}
