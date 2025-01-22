import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUserModel, GetUserModel } from '../../Models/User/UserModels';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from '../Storage/storage.service';
import { RegisterUser } from '../../Models/Register/RegisterUser';
import { UserLoginModel, UserLoginResultModel } from '../../Models/Login/LoginModels';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:5001/api/user';
  private loginUrl = `${this.baseUrl}/login`;
  private registerUrl = `${this.baseUrl}/register`;
  private createUserUrl = `${this.baseUrl}/create-user`;
  private getAllUsersUrl = `${this.baseUrl}/get-users`;
  private deleteUserUrl = `${this.baseUrl}/delete-user`;
  private logoutUrl = `${this.baseUrl}/logout`;
  private userLoggedIn = new BehaviorSubject<boolean>(false);


  constructor(
    private http: HttpClient,
    private _storageService: StorageService
  ) {  }

  takeAnonymousToken() {
    return this.http.get(`${this.baseUrl}/take-anonymous-token`, { responseType: 'text' });
  }

  // Kullanıcı kaydı yapmak icin kullanılır.
  registerUser(registerData: RegisterUser){
      return this.http.post(this.registerUrl, registerData, { responseType: 'text' });
    }

    // Kullanıcı girişi yapmak icin kullanılır.
  loginUser(loginInput: UserLoginModel){
    return this.http.post<UserLoginResultModel>(this.loginUrl, loginInput)
    }



  getAllUsers() {
    return this.http.get<GetUserModel[]>(this.getAllUsersUrl);
  }

  deleteUser(id: string) {
    const url = `${this.deleteUserUrl}?id=${id}`;
    return this.http.delete(url, { responseType: 'text' });
  }

  addUser(user: CreateUserModel) {
    return this.http.post(this.createUserUrl, user, { responseType: 'text' });
  }

  logoutUser() {
    return this.http.get(this.logoutUrl, { responseType: 'text' });
  }

  // Kullanıcı girişi yapmış mı kontrol eder.
    isLoggedIn(): Observable<boolean> {
      return this.userLoggedIn.asObservable();
    }

    // Kullanıcı girişi yapmış mı kontrol eder.
    setUserLoggedIn(value: boolean) {
      this.userLoggedIn.next(value);
    }
}
