import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { markAllAsTouched } from '../../../shared/helper';
import { AuthService } from '../../services/auth.service';
import { Organization } from '../../models/types';
import { Router } from '@angular/router';
import { SnackbarService } from '../../../shared/snackbar.service';
import { CustomValidatorService } from '../../services/custom-validator.service';
import { RETAILER_ID } from '../../../utils/const';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { LayoutComponent } from '../../../layout/layout.component';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-profile-update',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    CommonModule,
    MatGridListModule,
  ],
  templateUrl: './profile-update.component.html',
  styleUrl: './profile-update.component.scss',
})
export class ProfileUpdateComponent {
  vendorForm: FormGroup;
  flag: boolean = false;
  id: string = '';
  imageUrl!: string;
  userImage = '';
  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbar: SnackbarService,
    private validator: CustomValidatorService,
    private imageService: ImageService
  ) {
    this.vendorForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9.\-_$@*!]+$/),
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      contactNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[0-9]{10}$/),
      ]),
      address: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(50),
      ]),

      role_id: new FormControl(RETAILER_ID),
      role_specific_details: new FormGroup({
        gst_no: new FormControl('', Validators.required),
      }),
      userImage: new FormControl(''),
    });
  }

  ngOnInit(): void {
    // this.fetchAllOrganizations();
    this.fetchVendorById();
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

  collectData() {
    console.log(this.vendorForm.value);
    if (this.vendorForm.valid) {
      const { confirmPassword, ...formData } = this.vendorForm.value;
      (formData.username = formData.username),
        (formData.email = formData.email),
        (formData.user_image = this.userImage),
        (formData.contact_number = formData.contactNumber),
        (formData.address = formData.address),
        (formData.role_id = formData.role_id),
        (formData.role_specific_details = {
          gst_no: formData.role_specific_details.gst_no,
        });
      console.log('Mapped Payload for Backend:', formData);
      console.log('idjdidid', this.id);

      const updateProfileObservable = this.authService.updateProfile(
        this.id,
        formData
      );
      console.log('iddddddd', this.id);
      updateProfileObservable.subscribe({
        next: (response) => {
          console.log('response', response);

          this.snackbar.showSuccess('Profile updated successfully...');
          this.imageService.updateImage(this.userImage);
        },
      });
    } else {
      markAllAsTouched(this.vendorForm);
      this.snackbar.showError('Please Fill in all required information');
    }
  }

  fetchVendorById() {
    const vendorDetails = this.authService.getUserTypeByToken();
    vendorDetails.subscribe({
      next: (formData) => {
        console.log('vendor details...', formData.data);
        this.id = formData.data._id;
        this.userImage = formData.data.user_image;
        console.log('status', this.id);
        this.patchFormData(formData.data);
      },
    });
  }

  patchFormData(data: any) {
    console.log('datatatata', data.role_specific_details.gst_no);

    if (data) {
      this.vendorForm.patchValue({
        username: data.username,
        email: data.email,
        contactNumber: data.contact_number,
        address: data.address,
        role_id: data.role_id,
        role_specific_details: {
          gst_no: data.role_specific_details?.gst_no,
        },
      });

      this.vendorForm.markAllAsTouched();
    }
  }

  onFileSelected(event: Event) {
    console.log('event mamu', event);

    const imageControl = (event.target as HTMLInputElement).files?.[0];
    if (imageControl) {
      this.authService.uploadImage(imageControl).subscribe({
        next: (response) => {
          console.log('image', response.image);
          this.userImage = response.image;
        },
      });
    }
  }
}
