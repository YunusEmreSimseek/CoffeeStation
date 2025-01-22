import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConsts } from '../../../appConsts';
import { ProductModel, CreateProductModel } from '../../Models/Coffee/coffee.model';

@Injectable({
  providedIn: 'root'
})
export class CoffeeService {

  // private baseUrl = AppConsts.remoteUrlBase + '/catalog/products';
  private baseUrl = 'http://localhost:2500/api/product';


  constructor(private http: HttpClient) { }

  getAllCoffees(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.baseUrl);
  }

  getCoffeesByCategory(id: string): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`${this.baseUrl}/categoryId/${id}`);
  }

  getCoffeeById(id: string) {
    return this.http.get<ProductModel>(`${this.baseUrl}/${id}`);
  }

  deleteCoffee(id: string) {
    return this.http.delete(`${this.baseUrl}?id=${id}`, { responseType: 'text' });
  }

  addCoffee(coffee: CreateProductModel) {
    return this.http.post(this.baseUrl, coffee, { responseType: 'text' });
  }
}
