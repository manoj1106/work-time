'use server';
import { autoInjectable } from 'tsyringe';
import { ILoginRepository } from '../login.repository';
import { ServerConsts } from '../../consts/server.consts';
import { IDBRepository } from '../db.repository';
import { DBRepository } from './db.repository.impl';
import { User } from '@/_helpers/models/user.model';

@autoInjectable()
export class LoginRepository implements ILoginRepository {
  USERS: string = ServerConsts.USERS_COLLECTION;
  private dbRepository: IDBRepository;
  /**
   *
   * @param dbRepository injecting dbRepository
   *
   */
  public constructor(dbRepository: DBRepository) {
    this.dbRepository = dbRepository;
  }

  /**
   *
   * @param username
   * @return user
   *
   */
  findUser = async (username: string): Promise<User> => {
    const filter = {
      username,
    };
    const user: User = await this.dbRepository.findDoc(this.USERS, filter);
    return user;
  };
}
