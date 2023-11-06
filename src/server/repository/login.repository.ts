export interface ILoginRepository {
  findUser(username: string): Promise<any>;
}
