import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { CategoryModel, CreateCategoryModel } from '../../Models/Category/CategoryModel';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  // private baseUrl = 'http://localhost:5000/services/catalog/categories';
  private baseUrl = 'http://localhost:2500/api/category';


  constructor(private http: HttpClient) { }

  getAllCategories() {
    return this.http.get<CategoryModel[]>(this.baseUrl);
  }

  addCategory(category: CreateCategoryModel) {
    return this.http.post(this.baseUrl, category, { responseType: 'text' });
  }

  updateCategory(category: CategoryModel) {
    return this.http.put(this.baseUrl, category, { responseType: 'text' });
  }

  deleteCategory(categoryId: string) {
    return this.http.delete(`${this.baseUrl}?id=${categoryId}`, { responseType: 'text' });
  }

}
