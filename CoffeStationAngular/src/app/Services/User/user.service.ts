import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUserModel, GetUserModel } from '../../Models/User/UserModels';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:5001/api/user';

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<GetUserModel[]>(this.baseUrl);
  }

  deleteUser(id: string) {
    const url = `${this.baseUrl}?id=${id}`;
    return this.http.delete(url, { responseType: 'text' });
  }

  addUser(user: CreateUserModel) {
    console.log('create user', user);
    return this.http.post(this.baseUrl, user, { responseType: 'text' });
  }
}
