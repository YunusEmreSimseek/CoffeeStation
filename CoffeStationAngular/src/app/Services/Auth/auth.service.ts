// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { UserLoginModel, UserLoginResultModel } from '../../Models/Login/LoginModels';
// import { StorageService } from '../Storage/storage.service';
// import { RegisterUser } from '../../Models/Register/RegisterUser';


// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   private baseUrl = 'http://localhost:5001/api';
//   private tokenUrl = 'http://localhost:5001/connect/token';
//   private registerUrl = `${this.baseUrl}/Registers`;
//   private loginUrl = `${this.baseUrl}/Logins`;
//   private logoutUrl = `${this.loginUrl}/logout`;

//   private userLoggedIn = new BehaviorSubject<boolean>(false);

//   constructor(
//     private http: HttpClient,
//     private _storageService: StorageService
//   ) {
//     this.userLoggedIn = new BehaviorSubject<boolean>(this.isUserLoggedIn());
//   }

//   // Ziyaretci tokeni almak icin kullanılır.
//   getAnonymousToken() {
//     const body = new URLSearchParams();
//     body.set('grant_type', 'client_credentials');
//     body.set('client_id', "CoffeeStationVisitorId");
//     body.set('client_secret', "coffeestationsecret");

//     const headers = new HttpHeaders({
//       'Content-Type': 'application/x-www-form-urlencoded',
//     });

//     return this.http.post(this.tokenUrl, body.toString(), { headers });

//   }

//   // Kullanıcı kaydı yapmak icin kullanılır.
//   registerUser(registerData: RegisterUser){
//       return this.http.post(this.registerUrl, registerData, { responseType: 'text' });
//     }

//   // Kullanıcı girişi yapmak icin kullanılır.
//   loginUser(loginInput: UserLoginModel){
//     return this.http.post<UserLoginResultModel>(this.loginUrl, loginInput)
//     }

//   // Kullanıcı girişi yapmış mı kontrol eder.
//   isUserLoggedIn(): boolean {
//     const userId = this._storageService.getUserId();
//     if(userId){
//       return true;
//     }else {
//       return false;
//     }}

//   // Kullanıcı girişi yapmışsa çıkış yapmasını sağlar.
//   logoutUser() {
//     return this.http.post(this.logoutUrl, null, { responseType: 'text' });
//   }

//   // Kullanıcı girişi yapmış mı kontrol eder.
//   isLoggedIn(): Observable<boolean> {
//     return this.userLoggedIn.asObservable();
//   }

//   // Kullanıcı girişi yapmış mı kontrol eder.
//   setUserLoggedIn(value: boolean) {
//     this.userLoggedIn.next(value);
//   }
// }
