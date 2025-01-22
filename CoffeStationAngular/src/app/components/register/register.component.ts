import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/Auth/auth.service';
import { Router } from '@angular/router';
import { RegisterUser } from '../../Models/Register/RegisterUser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  registerError: string = '';

  constructor(
    private fb: FormBuilder,
    private _authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }


  // Şifrelerin eşleşip eşleşmediğini kontrol eder
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const formData: RegisterUser = this.registerForm.value;
    this._authService.registerUser(formData).subscribe({
      next: (response) => {
        alert(response);
        console.log(response);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert('Kayıt başarısız!');
        this.registerError = 'Kullanıcı adı veya email zaten mevcut';
        console.error('Register Error:', this.registerError);
      }
    });
  }



}
