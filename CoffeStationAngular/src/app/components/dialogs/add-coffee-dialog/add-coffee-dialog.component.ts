import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CoffeeService } from '../../../Services/Coffee/coffee.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryModel } from '../../../Models/Category/CategoryModel';
import { CategoryService } from '../../../Services/Category/category.service';
import { CreateProductModel } from '../../../Models/Coffee/coffee.model';
import { AppConsts } from '../../../../appConsts';

@Component({
  selector: 'app-add-coffee-dialog',
  templateUrl: './add-coffee-dialog.component.html',
  styleUrl: './add-coffee-dialog.component.css'
})
export class AddCoffeeDialogComponent implements OnInit {
  coffeeForm: FormGroup;
  categories: CategoryModel[] = [];

  constructor(
    private dialogRef: MatDialogRef<AddCoffeeDialogComponent>,
    private fb: FormBuilder,
    private _coffeeService: CoffeeService,
    private _categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {
    this.coffeeForm = this.fb.group({
      productName: ['', Validators.required],
      productDescription: ['', Validators.required],
      productPrice: [0, [Validators.required, Validators.min(0)]],
      categoryId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(){
    this._categoryService.getAllCategories().subscribe({
      next: (cats) => {
        this.categories = cats;
      },
      error: (err) => {
        this.snackBar.open('Kategoriler yüklenirken hata oluştu.', 'Kapat', { duration: 3000 });
      }
    });
  }

  onSave() {
    if (this.coffeeForm.invalid) {
      return;
    }

    const newCoffee: CreateProductModel = this.coffeeForm.value;
    newCoffee.productImageUrl = AppConsts.coffeeImageUrl;
    this._coffeeService.addCoffee(newCoffee).subscribe({
      next: () => {
        this.snackBar.open('Kahve başarıyla eklendi.', 'Kapat', {
          duration: 2000
        });
        this.dialogRef.close('success');
      },
      error: (err) => {
        console.log('AddCoffe Error:', err.error);
        this.snackBar.open('Kahve eklenemedi.', 'Kapat', {
          duration: 3000
        });

      }
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

}
