import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GetUserModel } from '../../../Models/User/UserModels';
import { UserService } from '../../../Services/User/user.service';
import { AddUserDialogComponent } from '../../dialogs/add-user-dialog/add-user-dialog.component';

export interface UserDto {
  id: string;
  userName: string;
  email: string;
  // roller, vb. ...
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {
  // Kullanıcılar için sütunlar
  displayedColumns: string[] = ['id', 'userName', 'email', 'name', 'surname', 'role', 'actions'];
  // Kullanıcılar için veri kaynağı
  dataSource: GetUserModel[] = [];
  // Kullanıcılar
  users: GetUserModel[] = [];

  constructor(
    private _userService: UserService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { this.loadUsers();}

  // Kullanıcıları yükle
  loadUsers() {
    this._userService.getAllUsers().subscribe((data: GetUserModel[]) => {
      this.users = data;
      this.dataSource = data;
    });
    }

  // Yeni kullanıcı eklemek için Dialog aç
  openAddUserDialog() {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      // Dialog kapandıktan sonra geri dönen sonuç
      if (result === 'success') {
        // Kullanıcı eklendiyse listeyi yenileyin
        this.loadUsers();
      }
    });
  }

  // Kullanıcı sil
  deleteUser(userId: string) {
    if (!confirm('Bu kullanıcıyı silmek istediğinize emin misiniz?')) {
      return;
    }
    this._userService.deleteUser(userId).subscribe(() => {
      this.loadUsers();
      this.snackBar.open('Kullanıcı başarıyla silindi', '', {
        duration: 2000
      });
    });
  }

}
