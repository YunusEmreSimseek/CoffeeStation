import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CategoryModel } from '../../../Models/Category/CategoryModel';
import { CategoryService } from '../../../Services/Category/category.service';
import { AppConsts } from '../../../../appConsts';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  // Kategorileri tutar
  categories: CategoryModel[] = [];

  constructor(
    private _categoryService: CategoryService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  // Bütün kategorileri getirir
  getCategories(){
    this._categoryService.getAllCategories().subscribe({
      next: (value) => {
        this.categories = value;
      },
      error: (err) => {
        console.log('GetCategories Error:', err.error);
      },
    })
  }

  get categoryImage(){
    return AppConsts.coffeeImageUrl.toString();
  }

}

