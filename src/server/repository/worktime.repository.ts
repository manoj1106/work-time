import { WorktimeConfig } from '@/_helpers/models/worktime.model';

export interface IWorktimeRepository {
  /**
   * find the existing worktime config
   */
  findWorktimeConfig(): Promise<WorktimeConfig>;

  /**
   *
   * @param worktimeConfig
   *
   */
  saveWorktimeConfig(
    worktimeConfig: WorktimeConfig
  ): Promise<WorktimeConfig | null>;

  /**
   *
   * @param worktimeConfig
   *
   */
  updateWorktimeConfig(
    worktimeConfig: WorktimeConfig
  ): Promise<WorktimeConfig | null>;
}
