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

    createOrder(order: CreateOrderModel){
      return this.http.post(this.baseUrl, order, { responseType : 'text' });
    }

    getAllOrders(){
      return this.http.get<OrderModel[]>(this.baseUrl);
    }
}
