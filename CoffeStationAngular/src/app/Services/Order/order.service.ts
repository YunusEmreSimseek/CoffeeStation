import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateOrderModel, OrderModel } from '../../Models/Order/OrderModels';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = "http://localhost:2503/api/order";


    constructor(
      private http: HttpClient,
    ) { }

    // Siparis olusturma
    createOrder(order: CreateOrderModel){
      return this.http.post(this.baseUrl, order, { responseType : 'text' });
    }

    // Butun siparisleri getirme
    getAllOrders(){
      return this.http.get<OrderModel[]>(this.baseUrl);
    }
}
