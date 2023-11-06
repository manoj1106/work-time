import { ApiResponse } from '@/_helpers/api/response.model';

export interface ILoginService {
  performLogin(username: string, password: string): Promise<ApiResponse>;
}
