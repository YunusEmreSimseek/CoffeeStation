import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddressModel, CreateAddressModel } from '../../Models/Adress/AdressModels';
import { StorageService } from '../Storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  // Api istekleri icin baseUrl
  private baseUrl = "http://localhost:2503/api/address";

  constructor(
    private http: HttpClient,
    private _storageService: StorageService
  ) { }

  // Giris yapmis kullanicinin id'sini alarak adresini getirir.
  getCurrentUserAdress(){
    const userId = this._storageService.getUserId();
    return this.http.get<AddressModel>(this.baseUrl + "/userid/" + userId);
  }

  // Adres olusturur.
  createAddress(adress: CreateAddressModel){
    return this.http.post(this.baseUrl, adress, { responseType: 'text' });
  }

  // Id'ye gore adresi getirir.
  getAddressById(id: number){
    return this.http.get<AddressModel>(this.baseUrl + "/" + id);
  }
}
