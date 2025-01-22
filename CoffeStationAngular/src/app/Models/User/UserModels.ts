export interface GetUserModel {
  id: string;
  userName: string;
  name: string;
  surname: string;
  email: string;
  role: string;
}

export interface CreateUserModel {
  userName: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  role: string;
}
