export interface UserLoginModel {
    username: string;
    password: string;
}


export class UserLoginResultModel {
  userId?: string;
  username?: string;
  email?: string;
  token?: string;
  role?: string;
}
