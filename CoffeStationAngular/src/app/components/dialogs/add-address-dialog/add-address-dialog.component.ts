import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddressService } from '../../../Services/Address/address.service';
import { CreateAddressModel } from '../../../Models/Adress/AdressModels';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-address-dialog',
  templateUrl: './add-address-dialog.component.html',
  styleUrl: './add-address-dialog.component.css'
})
export class AddAddressDialogComponent {

  // Adres ekleme formu
  addressForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddAddressDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _addressService: AddressService,
    private snackBar: MatSnackBar

  ) {
    this.addressForm = this.fb.group({
      district: ['', Validators.required],
      city: ['', Validators.required],
      detail: ['', Validators.required]
    });
  }



  // Adres ekleme işlemi
  onSave() {
    if (this.addressForm.invalid) {
      return;
    }

    const formValue: CreateAddressModel = this.addressForm.value;
    formValue.userId = this.data.userId;
    this._addressService.createAddress(formValue).subscribe({
      next: (message) => {
        this.snackBar.open(message, 'Kapat', {
          duration: 2000
        });
        this.dialogRef.close('success');
      },
      error: (err) => {
        this.snackBar.open('Adres eklenemedi.', 'Kapat', {
          duration: 3000
        });
      }
    });
  }

  // İptal butonu
  onCancel() {
    this.dialogRef.close();
  }

}
