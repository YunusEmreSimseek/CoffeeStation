import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../Services/Auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent, ConfirmDialogData } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { StorageService } from '../../Services/Storage/storage.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

   isLoggedIn$ = new Observable<boolean>();

  constructor(
    public dialog: MatDialog,
    private _authService: AuthService,
    private snackBar: MatSnackBar,
    private _storageService: StorageService,
    private router: Router
  ) {
    this.isLoggedIn$ = this._authService.isLoggedIn();
  }

  ngOnInit(): void {

  }

  openLogoutDialog(): void {

    const dialogData: ConfirmDialogData = {
      title: 'Çıkış Yap',
      message: 'Çıkış yapmak istediğinize emin misiniz?'
    };

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._authService.logoutUser().subscribe((result) => {
          if(result){
            this._storageService.clearUser();
            this._authService.setUserLoggedIn(false);
            this._storageService.saveUserRole('Visitor');
            this.router.navigate(['/login']);
            this.snackBar.open('Başarıyla çıkış yaptınız.', 'Kapat', {
              duration: 3000,
            });
          }
    });
  }});
}
}

