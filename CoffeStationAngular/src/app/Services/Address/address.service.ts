import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddressModel, CreateAddressModel } from '../../Models/Adress/AdressModels';
import { StorageService } from '../Storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private baseUrl = "http://localhost:2510/api/addresses";

  constructor(
    private http: HttpClient,
    private _storageService: StorageService
  ) { }

  getCurrentUserAdress(){
    const userId = this._storageService.getUserId();
    return this.http.get<AddressModel>(this.baseUrl + "/userid/" + userId);
  }

  createAddress(adress: CreateAddressModel){
    return this.http.post(this.baseUrl, adress, { responseType: 'text' });
  }

  getAddressById(id: number){
    return this.http.get<AddressModel>(this.baseUrl + "/" + id);
  }
}
