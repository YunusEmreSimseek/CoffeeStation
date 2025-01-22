import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasketTotal } from '../../Models/Basket/BasketModels';
import { Observable } from 'rxjs';
import { StorageService } from '../Storage/storage.service';
import { AppConsts } from '../../../appConsts';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  private baseUrl = AppConsts.remoteUrlBase + '/basket/basket';


  constructor(
    private http: HttpClient,
    private _storageService: StorageService,
  ) {}

  AddToBasket(basket: BasketTotal) {
    this.http.post(this.baseUrl, basket,  { responseType: 'text' }).subscribe();
  }


  getMyBasket(): Observable<BasketTotal> {
      const userId = this._storageService.getUserId();
      const url = `${this.baseUrl}/${userId}`;
      return this.http.get<BasketTotal>(url);
    }


  updateBasket(basketTotal: BasketTotal) {
     return this.http.post(this.baseUrl, basketTotal,  { responseType: 'text' })
  }

  getBasketById(basketId: number): Observable<BasketTotal> {
    const url = `${this.baseUrl}/${basketId}`;
    return this.http.get<BasketTotal>(url);
  }


}
