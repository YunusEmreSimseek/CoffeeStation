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
  // Api istekleri icin kullanılacak baseUrl ve diger url'ler
  private baseUrl = 'http://localhost:5001/api/user';
  private loginUrl = `${this.baseUrl}/login`;
  private registerUrl = `${this.baseUrl}/register`;
  private createUserUrl = `${this.baseUrl}/create-user`;
  private getAllUsersUrl = `${this.baseUrl}/get-users`;
  private deleteUserUrl = `${this.baseUrl}/delete-user`;
  private logoutUrl = `${this.baseUrl}/logout`;

  // Kullanıcı giris yapmis mi yapmamis mi bilgisini tutar.
  private userLoggedIn: BehaviorSubject<boolean>;


  constructor(
    private http: HttpClient,
    private _storageService: StorageService
  ) {
    const initIsLoggedIn = this._storageService.getUserId() !== null;
    this.userLoggedIn = new BehaviorSubject<boolean>(initIsLoggedIn);
   }

  // Anonim token almak icin kullanılır.
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


  // Butun kullanıcıları getirmek icin kullanılır.
  getAllUsers() {
    return this.http.get<GetUserModel[]>(this.getAllUsersUrl);
  }

  // Kullanıcı silmek icin kullanılır.
  deleteUser(id: string) {
    const url = `${this.deleteUserUrl}?id=${id}`;
    return this.http.delete(url, { responseType: 'text' });
  }

  // Kullanıcı eklemek icin kullanılır.
  addUser(user: CreateUserModel) {
    return this.http.post(this.createUserUrl, user, { responseType: 'text' });
  }

  // Kullanıcı cikis yapmak icin kullanılır.
  logoutUser() {
    return this.http.get(this.logoutUrl, { responseType: 'text' });
  }

  // Kullanıcı giris yapmis mi yapmamis mi bilgisini don
  getUserLoggedInObservable(): Observable<boolean> {
      return this.userLoggedIn.asObservable();
  }

  // Kullanıcı giris yapmis mi yapmamis mi bilgisini set et
  setUserLoggedIn(value: boolean) {
      this.userLoggedIn.next(value);
  }
}
