import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../Storage/storage.service';
import { AppConsts } from '../../../appConsts';
import { BasketModel } from '../../Models/Basket/BasketModels';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  // Api istekleri icin baseUrl
  private baseUrl = "http://localhost:2501/api/basket";


  constructor(
    private http: HttpClient,
    private _storageService: StorageService,
  ) {}

  // Sepete urun ekleme
  AddToBasket(basket: BasketModel) {
    this.http.post(this.baseUrl, basket,  { responseType: 'text' }).subscribe();
  }

  // Giris yapmis kullaniciya ait sepeti getirme
  getUserBasket(): Observable<BasketModel> {
      const userId = this._storageService.getUserId();
      const url = `${this.baseUrl}?userId=${userId}`;
      return this.http.get<BasketModel>(url);
    }

  // Sepeti guncelleme
  updateBasket(basketTotal: BasketModel) {
     return this.http.post(this.baseUrl, basketTotal,  { responseType: 'text' })
  }


}
