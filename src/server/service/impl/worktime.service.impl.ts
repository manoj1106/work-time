'use server';
import { injectable } from 'tsyringe';
import { IWorktimeRepository } from '@/server/repository/worktime.repository';
import { IWorktimeService } from '../worktime.service';
import { WorktimeRepository } from '@/server/repository/impl/worktime.repository.impl';
import { WorktimeConfig } from '@/_helpers/models/worktime.model';
import { ResponseHandler } from '@/_helpers/api/response.handler';
import { ApiResponse } from '@/_helpers/api/response.model';
import { StringUtils } from '@/_helpers/utils/string.utils';

@injectable()
export class WorktimeService implements IWorktimeService {
  private worktimeRepository: IWorktimeRepository;
  private responseHandler: ResponseHandler;

  /**
   *
   * @param worktimeRepository
   * constructor based dependency injection
   *
   */
  public constructor(
    worktimeRepository: WorktimeRepository,
    responseHandler: ResponseHandler
  ) {
    this.worktimeRepository = worktimeRepository;
    this.responseHandler = responseHandler;
  }

  public findWorktimeConfig = async (): Promise<ApiResponse> => {
    const msg = 'Worktime Config fetched successfully';
    const worktimeConfig: WorktimeConfig =
      await this.worktimeRepository.findWorktimeConfig();
    return this.responseHandler.getInfoResponse(false, msg, worktimeConfig);
  };

  public saveOrUpdateWorktimeConfig = async (
    worktimeConfig: WorktimeConfig
  ): Promise<ApiResponse> => {
    // config already exists.. update config
    if (worktimeConfig.id && StringUtils.isNotBlank(worktimeConfig.id)) {
      return await this.updateWorktimeConfig(worktimeConfig);
    } else {
      //save config
      return await this.saveWorktimeConfig(worktimeConfig);
    }
  };

  private updateWorktimeConfig = async (
    worktimeConfig: WorktimeConfig
  ): Promise<ApiResponse> => {
    let msg = 'Worktime config updated successfully';
    const responsePayload = await this.worktimeRepository.updateWorktimeConfig(
      worktimeConfig
    );
    if (StringUtils.isNullOrUndefined(responsePayload)) {
      return this.responseHandler.getErrorResponse('Could not update config');
    } else {
      return this.responseHandler.getSuccessResponse(msg, responsePayload);
    }
  };

  private saveWorktimeConfig = async (
    worktimeConfig: WorktimeConfig
  ): Promise<ApiResponse> => {
    let msg = 'Worktime config saved successfully';
    const responsePayload = await this.worktimeRepository.saveWorktimeConfig(
      worktimeConfig
    );
    if (StringUtils.isNullOrUndefined(responsePayload)) {
      return this.responseHandler.getErrorResponse('Could not save config');
    } else {
      return this.responseHandler.getSuccessResponse(msg, responsePayload);
    }
  };
}
