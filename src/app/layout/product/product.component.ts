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
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
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

  totalTiffins = 0;
  pageSize = 3;
  currentPage = 1;
  totalPages!: number

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
    this.getAllTiffins(this.currentPage, this.pageSize);
  }
  getAllTiffins(pageNo: number, limit: number) {
    console.log('Get all tiffins');
    const tiffinObservable = this.productService.getProducts(pageNo, limit);
    tiffinObservable.subscribe({
      next: (response) => {
        console.log('Tiffin response', response);
        this.tiffinArray = response.data;
        this.totalTiffins = response.pagination.totalItems
        // this.pageSize = response.pagination.totalPages
        this.totalPages = response.pagination.totalPages
      }
    });
  }
  goToProductDetails() {
    this.router.navigate(['/layout/product-view-add']);
  }
  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    console.log("in my component ", event);
    if (this.currentPage <= this.totalPages) {
      this.getAllTiffins(this.currentPage + 1, this.pageSize);
    }
  }
}
