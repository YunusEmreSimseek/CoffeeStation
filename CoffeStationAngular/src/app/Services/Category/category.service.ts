import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { CategoryModel, CreateCategoryModel } from '../../Models/Category/CategoryModel';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  // Api istekleri icin baseUrl
  private baseUrl = 'http://localhost:2500/api/category';


  constructor(private http: HttpClient) { }

  // Butun kategorileri getirme
  getAllCategories() {
    return this.http.get<CategoryModel[]>(this.baseUrl);
  }

  // Kategori ekleme
  addCategory(category: CreateCategoryModel) {
    return this.http.post(this.baseUrl, category, { responseType: 'text' });
  }

  // Kategori guncelleme
  updateCategory(category: CategoryModel) {
    return this.http.put(this.baseUrl, category, { responseType: 'text' });
  }

  // Kategori silme
  deleteCategory(categoryId: string) {
    return this.http.delete(`${this.baseUrl}?id=${categoryId}`, { responseType: 'text' });
  }

}
