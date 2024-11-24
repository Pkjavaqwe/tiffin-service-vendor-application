import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { TableComponent } from "../../shared/table/table.component";
import { ProductsService } from './services/products.service';
import { Tiffin } from './models/tiffin';
@Component({
  selector: 'app-product',
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
    MatSlideToggleModule, TableComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  tiffinArray: Tiffin[] = [];
  columns = [
    // --isActive
    { name: 'tiffin_name', header: 'tiffin' },
    { name: 'tiffin_price', header: 'price' },
    { name: 'tiffin_available_quantity', header: 'quantity' },
    { name: 'isActive', header: 'status' }
  ];

  constructor(private productService: ProductsService, private router: Router) { }
  ngOnInit(): void {
    this.getAllTiffins();
  }

  getAllTiffins() {
    console.log('Get all tiffins');
    const tiffinObservable = this.productService.getProducts();
    tiffinObservable.subscribe({
      next: (response) => {
        console.log('Tiffin response', response);
        this.tiffinArray = response.data;
      }
    });
  }

  goToProductDetails() {
    this.router.navigate(['/product-view']);
  }
}
