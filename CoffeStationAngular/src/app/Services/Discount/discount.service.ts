import { Injectable } from '@angular/core';
import { AppConsts } from '../../../appConsts';
import { HttpClient } from '@angular/common/http';
import { Coupon, CreateCuponModel, GetCouponModel } from '../../Models/Discount/DiscountModels';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {


  // Api istekleri icin basUrl
  private baseUrl = 'http://localhost:2502/api/discount';

  constructor(private http: HttpClient) { }

  // Koda gore indirim kuponu getirme
  getDiscountByCode(code: string): Observable<Coupon> {
    return this.http.get<Coupon>(`${this.baseUrl}/code/${code}`);
  }

  // Tum indirim kuponlarini getirme
  getAllDiscounts(): Observable<GetCouponModel[]> {
    return this.http.get<GetCouponModel[]>(this.baseUrl);
  }

  // Indirim kuponu silme
  deleteDiscount(couponId: string){
    return this.http.delete(`${this.baseUrl}?id=${couponId}`, { responseType: 'text' });
  }

  // Indirim kuponu ekleme
  addDiscount(discount: CreateCuponModel) {
    return this.http.post(this.baseUrl, discount, { responseType: 'text' });
  }
}
