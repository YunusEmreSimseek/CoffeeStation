import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryModel, CreateCategoryModel } from '../../../Models/Category/CategoryModel';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../../Services/Category/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-edit-category-dialog',
  templateUrl: './add-edit-category-dialog.component.html',
  styleUrl: './add-edit-category-dialog.component.css'
})
export class AddEditCategoryDialogComponent {
  categoryForm: FormGroup;
  mode: 'add' | 'edit' = 'add';
  categoryToEdit?: CategoryModel;

  constructor(
    private dialogRef: MatDialogRef<AddEditCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {
    this.mode = data.mode;
    this.categoryToEdit = data.category;

    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required]
    });

    if (this.mode === 'edit' && this.categoryToEdit) {
      this.categoryForm.patchValue({ categoryName: this.categoryToEdit.categoryName });
    }

  }

  onSave() {
    if (this.categoryForm.invalid) {
      return;
    }

    const formValue: CreateCategoryModel = this.categoryForm.value;
    if (this.mode === 'add') {
      this._categoryService.addCategory(formValue).subscribe({
        next: () => {
          this.snackBar.open('Kategori başarıyla eklendi.', 'Kapat', { duration: 2000 });
          this.dialogRef.close('success');
        },
        error: (err) => {
          this.snackBar.open('Kategori eklenirken hata oluştu.', 'Kapat', { duration: 3000 });
        }
      });
    } else {
      // edit
      if (!this.categoryToEdit) return;
      this.categoryToEdit.categoryName = formValue.categoryName;
      this._categoryService.updateCategory(this.categoryToEdit).subscribe({
        next: () => {
          this.snackBar.open('Kategori başarıyla güncellendi.', 'Kapat', { duration: 2000 });
          this.dialogRef.close('success');
        },
        error: (err) => {
          this.snackBar.open('Kategori güncellenirken hata oluştu.', 'Kapat', { duration: 3000 });
        }
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
