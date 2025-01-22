import { Injectable } from '@angular/core';
import { AppConsts } from '../../../appConsts';
import { HttpClient } from '@angular/common/http';
import { Coupon, CreateCuponModel, GetCouponModel } from '../../Models/Discount/DiscountModels';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  private baseUrl = AppConsts.remoteUrlBase + '/discount/discount';

  constructor(private http: HttpClient) { }

  getDiscountByCode(code: string): Observable<Coupon> {
    return this.http.get<Coupon>(`${this.baseUrl}/${code}`);
  }

  getAllDiscounts(): Observable<GetCouponModel[]> {
    return this.http.get<GetCouponModel[]>(this.baseUrl);
  }

  deleteDiscount(couponId: string){
    return this.http.delete(`${this.baseUrl}?id=${couponId}`, { responseType: 'text' });
  }

  addDiscount(discount: CreateCuponModel) {
    return this.http.post(this.baseUrl, discount, { responseType: 'text' });
  }
}
