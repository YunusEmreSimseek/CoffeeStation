import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../../Models/Coffee/coffee.model';
import { CoffeeService } from '../../../Services/Coffee/coffee.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddCoffeeDialogComponent } from '../../dialogs/add-coffee-dialog/add-coffee-dialog.component';
import { CategoryService } from '../../../Services/Category/category.service';
import { CategoryModel } from '../../../Models/Category/CategoryModel';

@Component({
  selector: 'app-coffees',
  templateUrl: './coffees.component.html',
  styleUrl: './coffees.component.css'
})
export class CoffeesComponent implements OnInit {

  // Tablo sütunları
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'categoryId', 'actions'];
  // Tablo veri kaynağı
  dataSource: ProductModel[] = [];
  // Kategoriler
  categories: CategoryModel[] = [];

  constructor(
    private _coffeeService: CoffeeService,
    private _categoryService: CategoryService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.loadCoffees();
    this.loadCategories();
  }

   // Tüm kahveleri yükle
   loadCoffees() {
    this._coffeeService.getAllCoffees().subscribe({
      next: (coffees) => {
        this.dataSource = coffees;
      },
      error: (err) => {
        this.snackBar.open('Kahveler yüklenirken hata oluştu.', 'Kapat', {
          duration: 3000
        });
      }
    });
  }

  // Kategori adını döndür
  chechCategoryName(categoryId: string): string {
    const category = this.categories.find(c => c.categoryId === categoryId);
    return category ? category.categoryName : '';
  }

  // Kategorileri yükle
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



  // Yeni kahve eklemek için Dialog aç
  openAddCoffeeDialog() {
    const dialogRef = this.dialog.open(AddCoffeeDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // Dialog kapandıktan sonra geri dönen sonuç
      if (result === 'success') {
        // Kahve eklendiyse listeyi yenileyin
        this.loadCoffees();
      }
    });
  }

  // Kahve sil
  deleteCoffee(coffeeId: string) {
    if (!confirm('Bu kahveyi silmek istediğinize emin misiniz?')) {
      return;
    }

    this._coffeeService.deleteCoffee(coffeeId).subscribe({
      next: () => {
        this.snackBar.open('Kahve başarıyla silindi.', 'Kapat', {
          duration: 2000
        });
        this.loadCoffees(); // Listeyi güncelle
      },
      error: (err) => {
        this.snackBar.open('Kahve silinirken hata oluştu.', 'Kapat', {
          duration: 3000
        });
      }
    });
  }

}
