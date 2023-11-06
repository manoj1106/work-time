import { ICredentials } from '@/app/api/auth/types/credentials.type';
import { StringUtils } from '../utils/string.utils';
import { injectable } from 'tsyringe';

@injectable()
export class SignInValidator {
  public constructor() {}

  validateSignInInputs = (
    inputs: ICredentials,
    setErrors: (errors: any) => void
  ) => {
    let errors: any = {};
    if (StringUtils.isBlank(inputs.username)) {
      errors['username'] = 'Email is required';
    }
    if (StringUtils.isBlank(inputs.password)) {
      errors['password'] = 'Password is required';
    }
    setErrors(errors);
    return StringUtils.isEmptyObject(errors);
  };
}
