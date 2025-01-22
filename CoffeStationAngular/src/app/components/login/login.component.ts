import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLoginModel, UserLoginResultModel } from '../../Models/Login/LoginModels';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from '../../Services/Storage/storage.service';
import { UserService } from '../../Services/User/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loginError: string = '';

  constructor(
    private fb: FormBuilder,
    private _userService: UserService,
    private _storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    }

  onSubmit(): void {
    const loginInput: UserLoginModel = this.loginForm.value;
    this._userService.loginUser(loginInput).subscribe({
      next: (result) => {
        // Kullanıcı bilgilerini local storage'a kaydeder.
          this._storageService.saveUser(result);
          // Kullanıcı rolüne göre yönlendirme yapar.
          if(result.role === 'Admin'){
            console.log('Admin girişi başarılı.');
            this._userService.setUserLoggedIn(true);
            this.router.navigate(['/admin']);
          } else {
            console.log('Kullanıcı girişi başarılı.');
            this._userService.setUserLoggedIn(true);
            this.router.navigate(['/home']);
          }
    },
      error: (err) => {
        this.loginError = 'Geçersiz kullanıcı adı veya şifre';
        console.log('Login Error:', this.loginError);
      }
    });




    // this._authService.loginUser(loginInput).subscribe({
    //   next: (result) => {
    //     // Kullanıcı bilgilerini local storage'a kaydeder.
    //       this._storageService.saveUser(result);
    //       // Kullanıcı rolüne göre yönlendirme yapar.
    //       if(result.role === 'Admin'){
    //         console.log('Admin girişi başarılı.');
    //         this._authService.setUserLoggedIn(true);
    //         this.router.navigate(['/admin']);
    //       } else {
    //         console.log('Kullanıcı girişi başarılı.');
    //         this._authService.setUserLoggedIn(true);
    //         this.router.navigate(['/home']);
    //       }
    // },
    //   error: (err) => {
    //     this.loginError = 'Geçersiz kullanıcı adı veya şifre';
    //     console.log('Login Error:', this.loginError);
    //   }
    // });
  }
}
