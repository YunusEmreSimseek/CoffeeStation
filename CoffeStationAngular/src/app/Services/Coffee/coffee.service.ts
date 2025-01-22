import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConsts } from '../../../appConsts';
import { CoffeeModel, CreateCoffeeModel } from '../../Models/Coffee/coffee.model';

@Injectable({
  providedIn: 'root'
})
export class CoffeeService {

  private baseUrl = AppConsts.remoteUrlBase + '/catalog/products';


  constructor(private http: HttpClient) { }

  getAllCoffees(): Observable<CoffeeModel[]> {
    return this.http.get<CoffeeModel[]>(this.baseUrl);
  }

  getCoffeesByCategory(id: string): Observable<CoffeeModel[]> {
    return this.http.get<CoffeeModel[]>(`${this.baseUrl}/CategoryId/${id}`);
  }

  getCoffeeById(id: string) {
    return this.http.get<CoffeeModel>(`${this.baseUrl}/${id}`);
  }

  deleteCoffee(id: string) {
    return this.http.delete(`${this.baseUrl}?id=${id}`, { responseType: 'text' });
  }

  addCoffee(coffee: CreateCoffeeModel) {
    return this.http.post(this.baseUrl, coffee, { responseType: 'text' });
  }
}
