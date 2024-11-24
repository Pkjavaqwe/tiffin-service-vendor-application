import { Component } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ProductsService } from '../services/products.service';
import { Tiffin } from '../models/tiffin';
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
    MatSlideToggleModule],
  templateUrl: './product-view.component.html',
  styleUrl: './product-view.component.scss'
})
export class ProductViewComponent {
  tiffinForm!: FormGroup;
  tiffin!: Tiffin;
  constructor(private router: Router, private activeRoute: ActivatedRoute, private productService: ProductsService) {
    const routeParams = this.activeRoute.snapshot.paramMap.get('_id')
    if (routeParams != null) {
      let _id = routeParams
      console.log(_id);
      this.getOneTiffin(_id)
    }
    this.tiffinForm = new FormGroup({
      tiffin_name: new FormControl('', [Validators.required]),
      tiffin_price: new FormControl('', [Validators.required]),
      tiffin_available_quantity: new FormControl('', [Validators.required]),
      isActive: new FormControl('', [Validators.required]),
      tiffin_description: new FormControl('', [Validators.required]),
      tiffin_type: new FormControl('', [Validators.required]),
      tiffin_image_url: new FormControl('', [Validators.required]),
    })
  }

  goBack() {
    this.router.navigate(['/product']);
  }
  getOneTiffin(_id: string) {
    console.log('Get one tiffin');
    console.log(_id);
    const tiffinObservable = this.productService.getOneTiffinById(_id);
    tiffinObservable.subscribe({
      next: (response) => {
        console.log('Tiffin response', response);
        this.tiffinForm.patchValue(response.data);
        console.log(this.tiffinForm.value);
      }
    });
  }
}
