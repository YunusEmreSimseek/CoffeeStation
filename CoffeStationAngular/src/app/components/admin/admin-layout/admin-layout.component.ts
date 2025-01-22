import { Component } from '@angular/core';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../../Services/Auth/auth.service';
import { StorageService } from '../../../Services/Storage/storage.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.css'
})
export class AdminLayoutComponent {
 isMenuOpen = true;





 constructor(
    public dialog: MatDialog,
    private _authService: AuthService,
    private _storageService: StorageService,
    private router: Router,
    private snackBar: MatSnackBar

 ){}

 toggleMenu() {
   this.isMenuOpen = !this.isMenuOpen;
 }

 logout(): void {

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
