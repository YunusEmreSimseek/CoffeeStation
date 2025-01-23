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

  private baseUrl = "http://localhost:2501/api/basket";


  constructor(
    private http: HttpClient,
    private _storageService: StorageService,
  ) {}

  AddToBasket(basket: BasketModel) {
    this.http.post(this.baseUrl, basket,  { responseType: 'text' }).subscribe();
  }


  getUserBasket(): Observable<BasketModel> {
      const userId = this._storageService.getUserId();
      const url = `${this.baseUrl}?userId=${userId}`;
      return this.http.get<BasketModel>(url);
    }


  updateBasket(basketTotal: BasketModel) {
     return this.http.post(this.baseUrl, basketTotal,  { responseType: 'text' })
  }


}
