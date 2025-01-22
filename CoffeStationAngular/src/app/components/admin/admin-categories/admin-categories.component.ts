import { Component, OnInit } from '@angular/core';
import { CategoryModel } from '../../../Models/Category/CategoryModel';
import { CategoryService } from '../../../Services/Category/category.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddEditCategoryDialogComponent } from '../../dialogs/add-edit-category-dialog/add-edit-category-dialog.component';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrl: './admin-categories.component.css'
})
export class AdminCategoriesComponent implements OnInit {
   displayedColumns: string[] = ['id', 'name', 'actions'];
    dataSource: CategoryModel[] = [];
    constructor(
      private _categoryService: CategoryService,
      private dialog: MatDialog,
      private snackBar: MatSnackBar
    ) {}

    ngOnInit() {this.loadCategories();}

    loadCategories() {
      this._categoryService.getAllCategories().subscribe({
        next: (categories) => {
          this.dataSource = categories;
        },
        error: (err) => {
          console.error('Error:',err.error);
          this.snackBar.open('Kategoriler yüklenirken hata oluştu.', 'Kapat', { duration: 3000 });
        }
      });
    }

    // Yeni kategori eklemek için dialog
    openAddCategoryDialog() {
      const dialogRef = this.dialog.open(AddEditCategoryDialogComponent, {
        width: '400px',
        data: { mode: 'add' }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'success') {
          this.loadCategories();
        }
      });
    }

    // Kategori düzenlemek için dialog
    openEditCategoryDialog(category: CategoryModel) {
      const dialogRef = this.dialog.open(AddEditCategoryDialogComponent, {
        width: '400px',
        data: { mode: 'edit', category }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'success') {
          this.loadCategories();
        }
      });
    }

    // Kategori sil
    deleteCategory(id: string) {
      if (!confirm('Bu kategoriyi silmek istediğinize emin misiniz?')) {
        return;
      }

      this._categoryService.deleteCategory(id).subscribe({
        next: () => {
          this.snackBar.open('Kategori başarıyla silindi.', 'Kapat', { duration: 2000 });
          this.loadCategories();
        },
        error: (err) => {
          this.snackBar.open('Kategori silinirken hata oluştu.', 'Kapat', { duration: 3000 });
        }
      });
    }
}
