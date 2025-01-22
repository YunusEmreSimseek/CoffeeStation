import { Injectable } from '@angular/core';
import { UserLoginResultModel } from '../../Models/Login/LoginModels';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private visitorTokenKey = 'visitorToken';
  private userTokenKey = 'authToken';
  private userIdKey = 'userId';
  private userEmailKey = 'userEmail';
  private userNameKey = 'userName';
  private userRoleKey = 'userRole';

  constructor() { }

  saveUser(loginResult: UserLoginResultModel){
    this.saveUserToken(loginResult.token ?? '');
    this.saveUserId(loginResult.userId ?? '');
    this.saveUsername(loginResult.username ?? '');
    this.saveEmail(loginResult.email ?? '');
    this.saveUserRole(loginResult.role ?? '');
  }

  clearUser(){
    sessionStorage.removeItem(this.userTokenKey);
    sessionStorage.removeItem(this.userIdKey);
    sessionStorage.removeItem(this.userNameKey);
    sessionStorage.removeItem(this.userEmailKey);
    this.saveUserRole('Visitor');
  }

  saveVisitorToken(token: string) {
    sessionStorage.setItem(this.visitorTokenKey, token);
  }

  saveUserToken(token: string) {
    sessionStorage.setItem(this.userTokenKey, token);
  }

  getUserToken(): string | null {
    return sessionStorage.getItem(this.userTokenKey);
  }

  saveUserId(token: string) {
    sessionStorage.setItem(this.userIdKey, token);
  }


  getUserId(): string | null {
   return sessionStorage.getItem(this.userIdKey);
  }

  saveUsername(username: string) {
    sessionStorage.setItem(this.userNameKey, username);
  }

  saveEmail(email: string) {
    sessionStorage.setItem(this.userEmailKey, email);
  }

  saveUserRole(role: string) {
    sessionStorage.setItem(this.userRoleKey, role);
  }

  getUserRole() {
    return sessionStorage.getItem(this.userRoleKey);
  }

  clearUserToken() {
    sessionStorage.removeItem(this.userTokenKey);
  }

  clearVisitorToken() {
    sessionStorage.removeItem(this.visitorTokenKey);
  }



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
