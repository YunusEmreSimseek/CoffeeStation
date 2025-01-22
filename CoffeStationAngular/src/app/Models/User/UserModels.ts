export interface GetUserModel {
  id: string;
  username: string;
  name: string;
  surname: string;
  email: string;
  role: string;
}

export interface CreateUserModel {
  username: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  role: string;
}
