'use server';
import { injectable } from 'tsyringe';
import * as bcrypt from 'bcrypt';
import { ILoginService } from '../login.service';
import { ILoginRepository } from '../../repository/login.repository';
import { LoginRepository } from '../../repository/impl/login.repository.impl';
import { ApiResponse } from '@/_helpers/api/response.model';
import { StringUtils } from '@/_helpers/utils/string.utils';
import { ResponseHandler } from '@/_helpers/api/response.handler';
import { User } from '@/_helpers/models/user.model';

@injectable()
export class LoginService implements ILoginService {
  private loginRepository: ILoginRepository;
  private responseHandler: ResponseHandler;

  public constructor(
    loginRepository: LoginRepository,
    responseHandler: ResponseHandler
  ) {
    this.loginRepository = loginRepository;
    this.responseHandler = responseHandler;
  }

  /**
   *
   * @param username email of the user trying to login
   * @param password password of the user trying to login
   * @returns apiResponse
   */
  performLogin = async (
    username: string,
    password: string
  ): Promise<ApiResponse> => {
    let errMsg = 'Email/Password are mandatory.';
    if (StringUtils.isBlank(username) || StringUtils.isBlank(password)) {
      return this.responseHandler.getErrorResponse(errMsg);
    }
    const user: User = await this.loginRepository.findUser(username);
    if (StringUtils.isNullOrUndefined(user)) {
      errMsg = 'User could not be found in system.';
      return this.responseHandler.getErrorResponse(errMsg);
    }
    const userPassword = user.password;
    const isSame = bcrypt.compareSync(password, userPassword);
    if (!isSame) {
      errMsg = 'Invalid Username/password';
      return this.responseHandler.getErrorResponse('Invalid Username/password');
    }
    const newUser: User = {
      ...user,
      password: '',
    };
    errMsg = 'User logged in successfully.';
    return this.responseHandler.getInfoResponse(false, errMsg, newUser);
  };
}
