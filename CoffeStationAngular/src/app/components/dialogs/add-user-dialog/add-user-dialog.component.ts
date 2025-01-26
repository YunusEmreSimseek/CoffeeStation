import { Component } from '@angular/core';
import { UserService } from '../../../Services/User/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateUserModel } from '../../../Models/User/UserModels';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrl: './add-user-dialog.component.css'
})
export class AddUserDialogComponent {

  // Kullanıcı ekleme formu
  userForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddUserDialogComponent>,
    private fb: FormBuilder,
    private _userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.userForm = this.fb.group({
      userName: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['User', Validators.required]
    });
  }

  // Kullanıcı ekleme işlemi
  onSave() {
    // Form geçerli değilse işlem yapma
    if (this.userForm.invalid) {
      return;
    }

    const newUser: CreateUserModel = this.userForm.value;
    this._userService.addUser(newUser).subscribe({
      next: () => {
        this.snackBar.open('Kullanıcı başarıyla eklendi.', 'Kapat', {
          duration: 2000
        });
        this.dialogRef.close('success');
      },
      error: (err) => {
        this.snackBar.open('Kullanıcı eklenemedi.', 'Kapat', {
          duration: 3000
        });
      }
    });
  }

  // İptal işlemi
  onCancel() {
    this.dialogRef.close();
  }

}
