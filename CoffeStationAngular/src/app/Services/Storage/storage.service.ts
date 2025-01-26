import { Injectable } from '@angular/core';
import { UserLoginResultModel } from '../../Models/Login/LoginModels';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  // Keys
  private appInitializedKey = 'appInitialized';
  private visitorTokenKey = 'visitorToken';
  private userTokenKey = 'authToken';
  private userIdKey = 'userId';
  private userEmailKey = 'userEmail';
  private userNameKey = 'userName';
  private userRoleKey = 'userRole';

  constructor() { }

  // Kullanici bilgilerini kaydetme
  saveUser(loginResult: UserLoginResultModel){
    this.saveUserToken(loginResult.token ?? '');
    this.saveUserId(loginResult.userId ?? '');
    this.saveUsername(loginResult.username ?? '');
    this.saveEmail(loginResult.email ?? '');
    this.saveUserRole(loginResult.role ?? '');
  }

  // Kullanici bilgilerini silme
  clearUser(){
    sessionStorage.removeItem(this.userTokenKey);
    sessionStorage.removeItem(this.userIdKey);
    sessionStorage.removeItem(this.userNameKey);
    sessionStorage.removeItem(this.userEmailKey);
    this.saveUserRole('Visitor');
  }

  // Ziyaretci tokeni kaydetme
  saveVisitorToken(token: string) {
    sessionStorage.setItem(this.visitorTokenKey, token);
  }

  // Kullanici tokeni kaydetme
  saveUserToken(token: string) {
    sessionStorage.setItem(this.userTokenKey, token);
  }

  // Kullanici tokeni getirme
  getUserToken(): string | null {
    return sessionStorage.getItem(this.userTokenKey);
  }

  // Kullanici id'sini kaydetme
  saveUserId(token: string) {
    sessionStorage.setItem(this.userIdKey, token);
  }

  // Kullanici id'sini getirme
  getUserId(): string | null {
   return sessionStorage.getItem(this.userIdKey);
  }

  // Kullaniciadini kaydetme
  saveUsername(username: string) {
    sessionStorage.setItem(this.userNameKey, username);
  }

  // Kullanici emailini kaydetme
  saveEmail(email: string) {
    sessionStorage.setItem(this.userEmailKey, email);
  }

  // Kullanici rolunu kaydetme
  saveUserRole(role: string) {
    sessionStorage.setItem(this.userRoleKey, role);
  }

  // Kullanici rolunu getirme
  getUserRole() {
    return sessionStorage.getItem(this.userRoleKey);
  }

  // Kullanici tokeni silme
  clearUserToken() {
    sessionStorage.removeItem(this.userTokenKey);
  }

  // Ziyaretci tokeni silme
  clearVisitorToken() {
    sessionStorage.removeItem(this.visitorTokenKey);
  }

  // Uygulamanin ilk acilisini kaydetme
  saveAppInitialized() {
    sessionStorage.setItem(this.appInitializedKey, 'true');
  }

  // Uygulamanin ilk acilisini kontrol etme
  isAppInitialized(): boolean {
    return sessionStorage.getItem(this.appInitializedKey) === 'true';
  }

  // Kullanici giris yapmis mi kontrol etme
  getUserIsLoggedIn(): boolean {
    return this.getUserId() !== null;
  }

  // Token getirme
  getToken(): string | null {
    var userToken = sessionStorage.getItem(this.userTokenKey);
    if(userToken != null){
      return userToken;
    }
    else {
      return sessionStorage.getItem(this.visitorTokenKey);
    }
  }





}
