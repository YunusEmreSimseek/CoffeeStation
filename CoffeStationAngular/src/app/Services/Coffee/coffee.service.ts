import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConsts } from '../../../appConsts';
import { ProductModel, CreateProductModel } from '../../Models/Coffee/coffee.model';

@Injectable({
  providedIn: 'root'
})
export class CoffeeService {

  // Api istekleri icin baseUrl
  private baseUrl = 'http://localhost:2500/api/product';


  constructor(private http: HttpClient) { }

  // Tum kahveleri getirme
  getAllCoffees(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.baseUrl);
  }

  // Kategoriye gore kahve getirme
  getCoffeesByCategory(id: string): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(`${this.baseUrl}/categoryid/${id}`);
  }

  // Id'ye gore kahve getirme
  getCoffeeById(id: string) {
    return this.http.get<ProductModel>(`${this.baseUrl}/${id}`);
  }

  // Kahve silme
  deleteCoffee(id: string) {
    return this.http.delete(`${this.baseUrl}?id=${id}`, { responseType: 'text' });
  }

  // Kahve ekleme
  addCoffee(coffee: CreateProductModel) {
    return this.http.post(this.baseUrl, coffee, { responseType: 'text' });
  }
}
