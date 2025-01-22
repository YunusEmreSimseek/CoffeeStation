import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DiscountService } from '../../../Services/Discount/discount.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateCuponModel } from '../../../Models/Discount/DiscountModels';

@Component({
  selector: 'app-add-discount-dialog',
  templateUrl: './add-discount-dialog.component.html',
  styleUrl: './add-discount-dialog.component.css'
})
export class AddDiscountDialogComponent {
  discountForm: FormGroup;
  constructor(
    private dialogRef: MatDialogRef<AddDiscountDialogComponent>,
    private fb: FormBuilder,
    private _discountService: DiscountService,
    private snackBar: MatSnackBar
  ) {
    this.discountForm = this.fb.group({
      code: ['', Validators.required],
      rate: [0, [Validators.required, Validators.min(1), Validators.max(100)]]
  });
}

onSave() {
  if (this.discountForm.invalid) {
    return;
  }

  const newDiscount: CreateCuponModel = this.discountForm.value;
  newDiscount.isActive = true;
  newDiscount.validDate = new Date();
  this._discountService.addDiscount(newDiscount).subscribe({
    next: () => {
      this.snackBar.open('Kupon başarıyla eklendi.', 'Kapat', {
        duration: 2000
      });
      // Diyaloğu 'success' ile kapatıyoruz
      this.dialogRef.close('success');
    },
    error: (err) => {
      this.snackBar.open('Kupon eklenemedi.', 'Kapat', {
        duration: 3000
      });
    }
  });
}

onCancel() {
  this.dialogRef.close();
}

}
