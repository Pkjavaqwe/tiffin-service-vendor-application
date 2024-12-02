import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { SearchService } from '../../shared/search.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MatCheckboxModule } from '@angular/material/checkbox';
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
    MatSlideToggleModule, TableComponent, MatCheckboxModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  checked = false;
  disabled = false;
  totalTiffins = 0;
  pageSize = 3;
  currentPage = 1;
  totalPages!: number

  updateButton!: boolean

  tiffinArray: Tiffin[] = [];
  allTiffinsArray: Tiffin[] = [];
  searchedQueryNotFound: string = "";
  columns = [
    // --isActive
    { name: 'tiffin_name', header: 'tiffin' },
    { name: 'tiffin_price', header: 'price' },
    { name: 'tiffin_available_quantity', header: 'quantity' },
    { name: 'tiffin_isavailable', header: 'Availability' },
    { name: 'tiffin_type', header: 'Type' }
  ];

  constructor(private productService: ProductsService, private router: Router, private searchService: SearchService) {
    this.searchService.getFilter().pipe(debounceTime(1500), distinctUntilChanged()).subscribe((query) => {
      console.log('searchQuery', query);
      this.searchAdminByMultipleEntity(query);
    });
  }
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
        this.allTiffinsArray = response.data;
        this.totalTiffins = response.pagination.totalItems
        // this.pageSize = response.pagination.totalPages
        this.totalPages = response.pagination.totalPages
      }
    });
  }

  goToProductDetails() {
    this.router.navigate(['/layout/product-add']);
  }
  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    console.log("in my component ", event);
    if (this.currentPage <= this.totalPages) {
      this.getAllTiffins(this.currentPage + 1, this.pageSize);
    }
  }
  onSearchInput(event: any) {
    const query = event.target.value;
    this.searchService.setFilter(query);
  }
  searchAdminByMultipleEntity(searchQueryOnKeyUp: string) {
    if (searchQueryOnKeyUp != '') {
      console.log('searchQueryOnKeyUp', searchQueryOnKeyUp);
      const searchedObservable = this.productService.searchRetailer(
        searchQueryOnKeyUp,
      );
      searchedObservable.subscribe({
        next: (searchedAdmin) => {
          console.log("searchedAdmin", searchedAdmin);
          if (searchedAdmin.data.length) {
            console.log(searchedAdmin);
            this.tiffinArray = searchedAdmin.data;
          } else {
            console.log('Not Found');
            this.tiffinArray = []
            this.searchedQueryNotFound = searchQueryOnKeyUp
          }
        },
        error: (err) => {
          console.log(err);
          this.tiffinArray = []
          this.searchedQueryNotFound = searchQueryOnKeyUp
        },
      });
    } else {
      this.tiffinArray = this.allTiffinsArray;
    }
  }
}
