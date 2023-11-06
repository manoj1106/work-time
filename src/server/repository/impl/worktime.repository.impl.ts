'use server';
import { autoInjectable } from 'tsyringe';
import { ServerConsts } from '@/server/consts/server.consts';
import { IWorktimeRepository } from '../worktime.repository';
import { DBRepository } from './db.repository.impl';
import { IDBRepository } from '../db.repository';
import { WorktimeConfig } from '@/_helpers/models/worktime.model';

@autoInjectable()
export class WorktimeRepository implements IWorktimeRepository {
  CONFIG_COLLECTION: string = ServerConsts.CONFIG_COLLECTION;
  private dbRepository: IDBRepository;

  /**
   *
   * @param dbRepository
   * constructor based dependency injection
   *
   */
  public constructor(dbRepository: DBRepository) {
    this.dbRepository = dbRepository;
  }

  /**
   *
   * @returns worktime configuration
   *
   */
  findWorktimeConfig = async (): Promise<WorktimeConfig> => {
    const filter = {};
    const worktimeConfig: WorktimeConfig = await this.dbRepository.findDoc(
      this.CONFIG_COLLECTION,
      filter
    );
    return worktimeConfig;
  };

  saveWorktimeConfig = async (
    worktimeConfig: WorktimeConfig
  ): Promise<WorktimeConfig | null> => {
    const result = await this.dbRepository.saveDoc(
      this.CONFIG_COLLECTION,
      worktimeConfig
    );
    if (result.acknowledged) {
      const responsePayload: WorktimeConfig = {
        ...worktimeConfig,
        id: result.insertedId.toString(),
      };
      return responsePayload;
    }
    return null;
  };

  updateWorktimeConfig = async (
    worktimeConfig: WorktimeConfig
  ): Promise<WorktimeConfig | null> => {
    const id = worktimeConfig.id;
    if (id) {
      const result = await this.dbRepository.updateDoc(
        this.CONFIG_COLLECTION,
        worktimeConfig,
        id
      );
      if (result.acknowledged) {
        return worktimeConfig;
      }
    }

    return null;
  };
}
