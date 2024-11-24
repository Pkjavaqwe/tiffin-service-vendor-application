import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { markAllAsTouched } from '../../../shared/helper';

import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [MatCardModule, MatInputModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatFormField, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private authService: AuthService, private route: Router) { }
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })
  ngOnInit(): void {
    const isTokenValid = this.authService.isAuthenticated();
    if (isTokenValid) {
      this.route.navigate(['/product']);
    }
  }
  onSubmit() {
    if (this.loginForm.invalid) {
      markAllAsTouched(this.loginForm);
    }
    const login = {
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value,
    };

    if (login.password && login.email) {
      const data = this.authService.authenticateLogin(login);
      data.subscribe({
        next: (response) => {
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('retailer_id', response._id);
          console.log("response", response);

          this.route.navigate(['/product']);
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
    console.log("loginForm", this.loginForm.value);
  }
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  get isEmailInvalid() {
    return (
      this.loginForm.controls.email.touched &&
      this.loginForm.controls.email.invalid &&
      this.loginForm.controls.email.dirty
    );
  }
  get isPasswordInvalid() {
    return (
      this.loginForm.controls.password.touched &&
      this.loginForm.controls.password.invalid &&
      this.loginForm.controls.password.dirty
    );
  }
}
