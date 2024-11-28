import { Component, OnInit } from '@angular/core';
import { OrderService } from './services/order.service';
import { OrderValue } from './model/order';
import { TableComponent } from '../../shared/table/table.component';
import { MatInputModule } from '@angular/material/input';
import { PageEvent } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { SearchService } from '../../shared/search.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-orders',
  imports: [TableComponent, MatInputModule, FormsModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit {
  ordersArray: OrderValue[] = [];
  currentPage: number = 1;
  totalItems: number = 0;
  totalPages: number = 0;
  pagesize: number = 2;

  constructor(private orderService: OrderService, private searchService: SearchService) {
    searchService.getFilter().pipe(debounceTime(1500), distinctUntilChanged()).subscribe((query) => {
      console.log('searchQuery', query);
      this.onSearch(query);
    });
  }
  ngOnInit(): void {
    this.getOrders(this.currentPage, this.pagesize);
  }

  getOrders(currentPage: number, pagesize: number) {
    console.log('giguguguuguu');

    this.orderService.getAllOrders(currentPage, pagesize).subscribe({
      next: (response) => {
        console.log('resppnsnsjdj', response.data);
        this.ordersArray = response.data;
        this.totalItems = response.pagination.totalItems;
        this.totalPages = response.pagination.totalPages;
        console.log('total items', this.totalPages);
      },
      error: (err) => console.log('Error Fetching orders', err),
    });
  }

  onPageChange(event: PageEvent) {
    const { pageSize, pageIndex } = event;
    this.pagesize = pageSize;
    if (pageIndex <= this.totalPages) {
      this.getOrders(pageIndex + 1, this.pagesize);
    }
  }

  orderColumns = [
    // { name: '_id', header: 'Order ID' },
    { name: 'customer_name', header: 'Customer Name' },

    { name: 'payment_mode', header: 'Payment mode' },

    { name: 'payment_status', header: 'Payment Status' },
    { name: 'delivery_status', header: 'Delivery Status' },
    { name: 'price', header: 'Price' },
    { name: 'created_at', header: 'Date', pipe: 'date' },
    { name: 'isActive', header: 'Is Active' },
  ];
  onRowClick(row: any) {
    console.log('Row clicked:', row);
  }

  query: string = '';
  errorMessage: string = '';

  onSearchInput(event: any) {
    const query = event.target.value;
    this.searchService.setFilter(query);
  }
  onSearch(query: string) {
    console.log('in search...', this.query);

    if (!query) {
      this.ordersArray = [];

      this.getOrders(this.currentPage, this.pagesize);
      this.errorMessage = '';
      return;
    }

    this.orderService.searchOrders(this.query).subscribe(
      (response) => {
        if (response.success) {
          console.log('response....', response.data);

          this.ordersArray = response.data;
          this.errorMessage = '';
        } else {
          this.ordersArray = [];
          this.errorMessage = 'No orders found.';
          console.log('errormessage', this.errorMessage);
        }
      },
      (error) => {
        this.ordersArray = [];
        this.errorMessage = 'An error occurred while fetching orders.';
        console.error(error);
      }
    );
  }
}
