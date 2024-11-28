import { booleanAttribute, Component, Input } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { _MatSlideToggleRequiredValidatorModule, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ProductsService } from '../services/products.service';
import { Tiffin } from '../models/tiffin';
import { HttpClient } from '@angular/common/http';
import { SnackbarService } from '../../../shared/snackbar.service';
@Component({
  selector: 'app-product-view',
  imports: [ReactiveFormsModule,
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
    MatToolbarModule,
    MatSlideToggleModule,
    FormsModule],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.scss',
})
export class ProductViewComponent {
  tiffinForm!: FormGroup;
  tiffin!: Tiffin;
  routeUrl: string | undefined = ""
  uploadedImageUrl: string = '';




  constructor(private router: Router, private snackbar: SnackbarService, private activeRoute: ActivatedRoute, private productService: ProductsService, private http: HttpClient) {
    const routeParams = this.activeRoute.snapshot.paramMap.get('_id')
    this.routeUrl = activeRoute.snapshot.routeConfig?.path
    if (routeParams != null) {
      let _id = routeParams
      console.log(_id);
      this.getOneTiffin(_id)
    }
    this.tiffinForm = new FormGroup({
      tiffin_name: new FormControl('', [Validators.required]),
      tiffin_price: new FormControl('', [Validators.required]),
      tiffin_available_quantity: new FormControl('', [Validators.required]),
      tiffin_description: new FormControl('', [Validators.required]),
      tiffin_type: new FormControl('', [Validators.required]),
      tiffin_image_url: new FormControl(''),
      tiffin_isavailable: new FormControl(''),
    })
  }


  goBack() {
    this.router.navigate(['/layout/product']);
  }
  collectData() {
    console.log("tiffinForm", this.tiffinForm);
    this.tiffin = this.tiffinForm.value;
    // this.tiffin.isActive = true;


    this.tiffin.tiffin_isavailable = true;
    this.tiffin.retailer_id = sessionStorage.getItem('retailer_id');
    this.tiffin.tiffin_image_url = this.uploadedImageUrl
    this.tiffin.tiffin_isavailable = this.tiffinForm.get('tiffin_isavailable')?.value;
    console.log("isActive from tiffinForm", this.tiffin);
    console.log(this.tiffin);
    if (this.routeUrl?.includes('product-view-add')) {
      this.addTiffin();
      this.snackbar.showSuccess("tiffin added successfully")
    } else {
      this.updateTiffin();
    }
  }
  onFileSelected(event: Event): void {
    const tiffinImageControls = (event.target as HTMLInputElement).files?.[0];
    console.log(tiffinImageControls);
    if (tiffinImageControls) {
      console.log('Selected File:', tiffinImageControls)
      this.productService.uploadTiffinImage(tiffinImageControls)
        .subscribe({
          next: (responseData) => {
            console.log("responseData", responseData.image);
            if (responseData.image) {
              this.uploadedImageUrl = responseData.image;
              console.log(this.uploadedImageUrl)
              console.log('Image URL set to form control:', this.uploadedImageUrl);
            }
          },
          error: (error) => {
            this.snackbar.showError('Error uploading tiffin image!');
            console.log('Error updated Tiffin...', error);
          },
        });
    }
  }

  getOneTiffin(_id: string) {
    console.log('Get one tiffin');
    console.log(_id);
    const tiffinObservable = this.productService.getOneTiffinById(_id);
    tiffinObservable.subscribe({
      next: (response) => {
        console.log('Tiffin response', response);
        const { tiffin_image_url, ...partialResponse } = response.data
        this.tiffinForm.patchValue(partialResponse);
        console.log(this.tiffinForm.value);
      }
    });
  }
  addTiffin() {
    if (this.tiffinForm.valid) {
      this.tiffin = {
        ...this.tiffinForm.value,
        tiffin_created_at: new Date(),
        tiffin_updated_at: new Date()
      }
      console.log('Form is valid, submitting data...');
      this.productService.addTiffinByRetailer(this.tiffin).subscribe({
        next: (response) => {
          console.log('Tiffin added successfully', response);
          this.router.navigate(['layout/product']);
        },
        error: (error) => {
          console.error('Error adding tiffin', error);
        }
      });
    } else {
      console.log('Form is invalid');
      this.tiffinForm.markAllAsTouched();
    }
  }

  updateTiffin() {
    let id = this.activeRoute.snapshot.paramMap.get('_id');
    if (id !== null) {
      const obsUpdate = this.productService.updateTiffinById(id, this.tiffin);
      obsUpdate.subscribe({
        next: (obj) => {
          console.log(obj);
          this.snackbar.showSuccess('tiffin updated successfully....')
          this.router.navigate(['layout/product']);
        },
        error: (err) => {
          console.log(err);
          this.snackbar.showError("something went wrong while updating")
        }
      })
    }
  }

  deleteTiffin() {
    let id = this.activeRoute.snapshot.paramMap.get('_id');
    if (id !== null) {
      const deleteObservable = this.productService.deleteTiffinById(id)
      deleteObservable.subscribe({
        next: (response) => {
          console.log(response);
          this.snackbar.showSuccess('tiffin deleted successfully')
          this.router.navigate(['layout/product']);
        },
        error: (err) => {
          console.log(err);
          this.snackbar.showSuccess('something went wrong while deleting tiffin')
        }
      })
    }
  }
}
