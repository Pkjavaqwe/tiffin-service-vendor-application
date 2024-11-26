import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { markAllAsTouched } from '../../../shared/helper';
import { Location, Organization } from '../../models/types';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { SnackbarService } from '../../../shared/snackbar.service';
import { RETAILER_ID } from '../../../utils/const';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CustomValidatorService } from '../../services/custom-validator.service';
@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
    RouterModule,
    ScrollingModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  vendorForm: FormGroup;
  organizations: Organization[] = [];
  locations: Location[] = [];
  totalItems = 0;
  strongPassword: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  flag: boolean = false
  constructor(
    private authService: AuthService,
    // private organizationService: OrganizationService,
    private router: Router,
    private snackbar: SnackbarService,
    private validator: CustomValidatorService
  ) {
    this.vendorForm = new FormGroup(
      {
        username: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9.\-_$@*!]+$/),
          Validators.minLength(3),
          Validators.maxLength(20)
        ]),
        email: new FormControl('', [Validators.required, Validators.email]),
        contactNumber: new FormControl('', [
          Validators.required,
          Validators.pattern(/^[0-9]{10}$/),
        ]),
        address: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
        password: new FormControl('', [
          Validators.required,
          // Validators.pattern(this.strongPassword),
          Validators.minLength(8),
          validator.logPatternError(),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
        role_id: new FormControl(RETAILER_ID),
        role_specific_details: new FormGroup({
          gst_no: new FormControl('', Validators.required),
        }),
      }, { validators: [this.validator.confirmPasswordValidator] });
  }

  ngOnInit(): void {
    // this.fetchAllOrganizations();

  }


  get userName() {
    return this.vendorForm.get('userName');
  }
  get errorMessageUserName(): string {
    const control = this.userName;
    if (!control) return '';
    if (control.dirty && control.touched) {
      switch (true) {
        case control.hasError('required'):
          return 'Username is required!';
        case control.hasError('pattern'):
          return 'Only letters, numbers, and special characters . - _ $ @ * ! are allowed.';
        case control.hasError('minlength'):
          return 'Username is at least 3 character!';
        case control.hasError('maxlength'):
          return 'Maximum length is 20 characters.';
        default:
          return '';
      }
    } else {
      return '';
    }
  }
  get email() {
    return this.vendorForm.get('email');
  }
  get errorMessageEmail(): string {
    const control = this.email;
    if (!control) return '';
    if (control.dirty && control.touched) {
      switch (true) {
        case control.hasError('required'):
          return 'Email is required!';
        case control.hasError('email'):
          return 'Please enter valid email';
        default:
          return '';
      }
    } else {
      return '';
    }
  }
  get contactNumber() {
    return this.vendorForm.get('contactNumber');
  }
  get errorMessageContactNumber(): string {
    const control = this.contactNumber;
    if (!control) return '';
    if (control.dirty && control.touched) {
      switch (true) {
        case control.hasError('required'):
          return 'Contact Number is required!';
        case control.hasError('pattern'):
          return 'Contact number must be exactly 10 digits!';
        default:
          return '';
      }
    } else {
      return '';
    }
  }
  get address() {
    return this.vendorForm.get('address');
  }
  get errorMessageAddress(): string {
    const control = this.address;
    if (!control) return '';
    if (control.dirty && control.touched) {
      switch (true) {
        case control.hasError('required'):
          return 'Address is required!';
        case control.hasError('minlength'):
          return 'Address is at least 5 character!';
        case control.hasError('maxlength'):
          return 'Address length is 50 characters.';
        default:
          return '';
      }
    } else {
      return '';
    }
  }
  get password() {
    return this.vendorForm.get('password');
  }
  get errorMessagePassword(): string {
    const control = this.password;
    if (!control) return '';
    if (control.dirty && control.touched) {
      switch (true) {
        case control.hasError('required'):
          return 'Password is required!';
        case control.hasError('minlength'):
          return 'Minimum 8 characters are required.';
        case control.errors?.['noNumber']:
          return 'At least one number is required.';
        case control.errors?.['noSpecialChars']:
          return 'At least one special character is required.';
        case control.errors?.['noLowerCase']:
          return 'At least one lowercase character is required.';
        case control.errors?.['noUpperCase']:
          return 'At least one uppercase character is required.';
        default:
          return '';
      }
    } else {
      return '';
    }
  }

  get confirmPassword() {
    return this.vendorForm.get('confirmPassword');
  }

  get errorMessageConfirmPassword(): string {
    const control = this.vendorForm.get('confirmPassword');
    if (!control) return '';

    if (control.touched && control.dirty) {
      if (control.hasError('passwordsDoNotMatch')) {
        return 'Passwords do not match!';
      }
      if (control.hasError('required')) {
        return 'Confirm password is required!';
      }
    }
    return '';
  }
  collectData() {
    console.log(this.vendorForm.value);
    if (this.vendorForm.valid) {
      const { confirmPassword, ...formData } = this.vendorForm.value;
      formData.username = formData.username,
        formData.password = formData.password,
        formData.email = formData.email,
        formData.contact_number = formData.contactNumber,
        formData.address = formData.address,
        formData.role_id = formData.role_id,
        formData.role_specific_details = {
          gst_no: formData.role_specific_details.gst_no
        }
      console.log("Mapped Payload for Backend:", formData);
      this.authService.register(formData).subscribe({
        next: (responseData) => {
          console.log("inside register");
          if (responseData.statusCode === 201) {
            console.log('Admin Registered Data', responseData);
            this.snackbar.showSuccess('Registered successfully!');
            this.router.navigate(['/']);
          }
        },
        error: (error) => {
          this.snackbar.showError('Registration failed:');
          console.log('Registration failed:...', error);
        },
      });
    } else {
      markAllAsTouched(this.vendorForm);
      this.snackbar.showError('Please Fill in all required information');
    }
  }
}
